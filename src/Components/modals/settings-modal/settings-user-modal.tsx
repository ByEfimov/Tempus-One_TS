import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import ButtonVoid from 'Components/mini-components/button';
import CustomInput from 'Components/mini-components/input';
import { useAuth } from 'Hooks/useAuth';
import { handleImageUpload } from 'Utils/handlers/handler-image-upload';
import { FC, useState } from 'react';

interface SettingsUserModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsUserModal: FC<SettingsUserModal> = ({ setModalOpen }) => {
    const [userPhoto, setUserPhoto] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userAge, setUserAge] = useState('');
    const { UserId } = useAuth();

    function ChangeFunction() {
        if (userPhoto !== '') {
            changeRequest('users/' + UserId, '/photo', userPhoto);
        }
        if (userDisplayName !== '') {
            changeRequest('users/' + UserId, '/name', userDisplayName);
        }
        if (userAge !== '') {
            changeRequest('users/' + UserId, '/age', userAge);
        }
        CloseModal();
    }

    return (
        <IsModal title="Настройки" setModalOpen={setModalOpen}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageUpload(e, setUserPhoto)}
            />
            <CustomInput
                placeholder="Имя"
                mode="large"
                changeFunction={(e) => {
                    setUserDisplayName(e.currentTarget.value);
                }}
            ></CustomInput>
            <CustomInput
                placeholder="Возраст"
                mode="large"
                changeFunction={(e) => {
                    setUserAge(e.currentTarget.value);
                }}
            ></CustomInput>
            <ButtonVoid
                clickHandler={ChangeFunction}
                title="Применить"
                classes={Styles.ButtonModal}
                padding={false}
            ></ButtonVoid>
        </IsModal>
    );
};

export default SettingsUserModal;

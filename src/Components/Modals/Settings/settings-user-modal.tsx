import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import changeUserData from 'Api/Users/change-user-data';
import ButtonVoid from 'Components/MiniComponents/button';
import CustomInput from 'Components/MiniComponents/input';
import { useAuth } from 'Hooks/useAuth';
import { handleImageUpload } from 'Utils/Handlers/HandlerImageUpload';
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
            changeUserData('photo', userPhoto, UserId);
        }
        if (userDisplayName !== '') {
            changeUserData('name', userDisplayName, UserId);
        }
        if (userAge !== '') {
            changeUserData('age', userAge, UserId);
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

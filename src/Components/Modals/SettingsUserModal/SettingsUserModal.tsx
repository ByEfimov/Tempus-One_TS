import { ChangeEvent, FC, useState } from 'react';
import { CloseModal, IsModal } from '../isModal';
import CustomInput from 'Components/MiniComponents/input';
import ButtonVoid from 'Components/MiniComponents/button';
import Styles from '../Modal.module.scss';
import changeUserData from 'Api/Users/changeUserData';
import { useAuth } from 'Hooks/useAuth';

interface SettingsUserModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsUserModal: FC<SettingsUserModal> = ({ setModalOpen }) => {
    const [userPhoto, setUserPhoto] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const { UserId } = useAuth();

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onload = () => {
            setUserPhoto(reader.result as string);
        };
        if (e.target.files?.[0]) {
            reader.readAsDataURL(e.target.files?.[0]);
        }
    };
    function ChangeFunction() {
        if (userPhoto !== '') {
            changeUserData('photo', userPhoto, UserId);
            CloseModal();
        }
        if (userDisplayName !== '') {
            changeUserData('name', userDisplayName, UserId);
            CloseModal();
        }
    }

    return (
        <IsModal title="Настройки" setModalOpen={setModalOpen}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageUpload(e)}
            />
            <CustomInput
                placeholder="Имя"
                mode="large"
                changeFunction={(e) => {
                    setUserDisplayName(e.currentTarget.value);
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

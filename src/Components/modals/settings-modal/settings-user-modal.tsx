import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import Input, {
    InputColors,
    InputTypes,
} from 'Assets/Tempus-Ui/Components/Inputs/Input';
import LoadImage from 'Assets/Tempus-Ui/Components/LoadImage/LoadImage';
import { useAuth } from 'Hooks/useAuth';
import { motion } from 'framer-motion';
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
        <IsModal setModalOpen={setModalOpen}>
            <motion.div className={Styles.SettingsModal}>
                <LoadImage
                    Callback={setUserPhoto}
                    Image={userPhoto}
                ></LoadImage>
                <Input
                    Placeholder="Имя"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setUserDisplayName(e.currentTarget.value);
                    }}
                    Value={userDisplayName}
                    Type={InputTypes.text}
                ></Input>
                <Input
                    Color={InputColors.primary}
                    Placeholder="Возраст"
                    Change={(e) => {
                        setUserAge(e.currentTarget.value);
                    }}
                    Value={userAge}
                    Type={InputTypes.number}
                ></Input>
                <Button
                    Title="Применить"
                    Click={ChangeFunction}
                    Type={ButtonTypes.active}
                ></Button>
            </motion.div>
        </IsModal>
    );
};

export default SettingsUserModal;

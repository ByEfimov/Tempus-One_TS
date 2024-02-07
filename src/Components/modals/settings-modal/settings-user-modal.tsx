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
import React, { FC, useEffect, useState } from 'react';

interface SettingsUserModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsUserModal: FC<SettingsUserModal> = ({ setModalOpen }) => {
    const [userPhoto, setUserPhoto] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userSpec, setUserSpec] = useState('');

    const [allSpecializations, setAllSpecializations] =
        useState<{ id: string; name: string }[]>();
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
        if (userSpec !== '') {
            changeRequest('users/' + UserId, '/specialization', userSpec);
        }
        CloseModal();
    }

    useEffect(() => {
        fetch('https://api.hh.ru/specializations')
            .then((response) => response.json())
            .then((data) => {
                setAllSpecializations(data[0].specializations);
            });
    }, []);

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
                <select onChange={(e) => setUserSpec(e.target.value)}>
                    {allSpecializations && (
                        <>
                            <option value="">Выберите профессию</option>
                            {allSpecializations.map((spec) => (
                                <option key={spec.id} value={spec.name}>
                                    {spec.name}
                                </option>
                            ))}
                        </>
                    )}
                </select>
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

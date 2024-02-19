import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from '@/Api/requests/change-request';
import {
    Button,
    ButtonTypes,
    Input,
    InputColors,
    InputTypes,
    LoadImage,
    LoadImageColors,
    Select,
    SelectTypes,
    formContainer,
    formItem,
} from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import axios from 'axios';
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
        useState<{ label: string; value: string }[]>();
    const { UserId } = useAuth();

    function ChangeFunction() {
        const defaultPath = 'users/' + UserId;

        if (userPhoto !== '') {
            changeRequest(defaultPath, '/photo', userPhoto);
        }
        if (userDisplayName !== '') {
            changeRequest(defaultPath, '/name', userDisplayName);
        }
        if (userAge !== '') {
            changeRequest(defaultPath, '/age', userAge);
        }
        if (userSpec !== '') {
            changeRequest(defaultPath, '/specialization', userSpec);
        }
        CloseModal();
    }

    useEffect(() => {
        axios.get('https://api.hh.ru/specializations').then((response) => {
            const data = response.data;
            setAllSpecializations(
                data[0].specializations.map(
                    (specialization: { name: string }) => ({
                        label: specialization.name,
                        value: specialization.name,
                    }),
                ),
            );
        });
    }, []);

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div {...formContainer} className={Styles.SettingsModal}>
                <LoadImage
                    Callback={setUserPhoto}
                    Path="UsersLogos"
                    Image={userPhoto}
                    Colors={LoadImageColors.Primary}
                    Variants={formItem}
                ></LoadImage>
                <Input
                    Placeholder="Имя"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setUserDisplayName(e.currentTarget.value);
                    }}
                    Value={userDisplayName}
                    Variants={formItem}
                    Type={InputTypes.text}
                ></Input>
                <Input
                    Color={InputColors.primary}
                    Placeholder="Возраст"
                    Change={(e) => {
                        setUserAge(e.currentTarget.value);
                    }}
                    Value={userAge}
                    Variants={formItem}
                    Type={InputTypes.number}
                ></Input>

                <Select
                    Array={allSpecializations}
                    setSelect={setUserSpec}
                    Placeholder="Выберите профессию"
                    Type={SelectTypes.Input}
                    Color={InputColors.primary}
                ></Select>

                <Button
                    Variants={formItem}
                    Title="Применить"
                    Click={ChangeFunction}
                    Type={ButtonTypes.active}
                ></Button>
            </motion.div>
        </IsModal>
    );
};

export default SettingsUserModal;

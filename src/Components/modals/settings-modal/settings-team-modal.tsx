import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from '@/Api/requests/change-request';
import { removeRequest } from '@/Api/requests/remove-request';
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
    TextArea,
    formContainer,
    formItem,
} from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import { OpenTeamType } from '@/Types/TypesOfData/team-or-user/open-team-type';
import { teamMembers } from '@/Types/TypesOfData/team-or-user/team-directions';
import AppRoutes from '@/Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsTeamModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    team: OpenTeamType;
}

const SettingsTeamModal: FC<SettingsTeamModal> = ({ setModalOpen, team }) => {
    const navigator = useNavigate();
    const { UserId, UserExperience } = useAuth();
    const [photo, setPhoto] = useState('');
    const [creators, setCreators] = useState('');

    const [form, setForm] = useState({
        title: '',
        description: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    function ChangeFunction() {
        const defaultPath = 'teams/' + team.id;
        if (photo !== '') {
            changeRequest(defaultPath, '/image', photo);
        }
        if (form.title !== '') {
            changeRequest(defaultPath, '/title', form.title);
        }
        if (form.description !== '') {
            changeRequest(defaultPath, '/desc', form.description);
        }
        if (creators !== '') {
            changeRequest(defaultPath, '/creators', creators);
        }
        CloseModal();
    }

    function removeTeam() {
        removeRequest('teams/', team.id);
        changeRequest('users/' + UserId, '/experience', UserExperience - 80);
        navigator(AppRoutes.TEAMS);
    }

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div {...formContainer} className={Styles.SettingsModal}>
                <LoadImage
                    Variants={formItem}
                    Path="TeamsLogos"
                    Colors={LoadImageColors.Primary}
                    Callback={setPhoto}
                    Image={photo}
                ></LoadImage>
                <Input
                    Variants={formItem}
                    Placeholder="Название"
                    Color={InputColors.primary}
                    Change={handleChange}
                    Value={form.title}
                    Type={InputTypes.text}
                ></Input>
                <TextArea
                    Variants={formItem}
                    Placeholder="Описание"
                    Change={handleChange}
                    Value={form.description}
                    Color={InputColors.primary}
                ></TextArea>
                <Select
                    Array={teamMembers}
                    setSelect={(select: string) => {
                        setCreators(select);
                    }}
                    Placeholder="Участники команды"
                    Type={SelectTypes.Input}
                    Color={InputColors.primary}
                ></Select>
                <Button
                    Variants={formItem}
                    Type={ButtonTypes.error}
                    Click={removeTeam}
                    Title="Удалить сообщество"
                ></Button>
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

export default SettingsTeamModal;

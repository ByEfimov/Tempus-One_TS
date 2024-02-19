import { createNewTeam } from '../api/createNewTeam';
import Styles from './styles.module.scss';
import {
    Button,
    ButtonTypes,
    Input,
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
import {
    teamDirections,
    teamMembers,
} from '@/Types/TypesOfData/team-or-user/team-directions';
import AppRoutes from '@/Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export type NewTeamType = {
    title: string;
    image: string;
    direction: string;
    creators: string;
    descriprion: string;
    members: Record<string, { UserId: string; UserRole: string }>;
};

const CreateTeamPage = () => {
    const { UserCanChanging, UserId, UserExperience } = useAuth();
    const navigate = useNavigate();

    const [image, setImage] = useState('');
    const [direction, setDirection] = useState('');
    const [creators, setCreators] = useState('');

    const [newTeam, setNewTeam] = useState<NewTeamType>({
        title: '',
        descriprion: '',
        image,
        direction,
        creators,
        members: {
            [UserId]: { UserId: UserId, UserRole: 'Administrator' },
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setNewTeam({
            ...newTeam,
            [name]: value,
        });
    };

    if (UserCanChanging) {
        return (
            <div className={Styles.Container}>
                <motion.form
                    onSubmit={(e) => e.preventDefault()}
                    className={Styles.Form}
                    {...formContainer}
                >
                    <LoadImage
                        Colors={LoadImageColors.Default}
                        Path="TeamsLogos"
                        Callback={setImage}
                        Image={image}
                        Variants={formItem}
                    ></LoadImage>
                    <Input
                        Placeholder="Название"
                        Change={handleChange}
                        Value={newTeam.title}
                        Type={InputTypes.text}
                        Variants={formItem}
                    ></Input>
                    <TextArea
                        Placeholder="Описание"
                        Change={handleChange}
                        Value={newTeam.descriprion}
                        Variants={formItem}
                    ></TextArea>
                    <Select
                        Type={SelectTypes.Input}
                        Placeholder="Выберите направление"
                        Array={teamDirections}
                        setSelect={setDirection}
                    ></Select>
                    <Select
                        Type={SelectTypes.Input}
                        Placeholder="Участники команды"
                        Array={teamMembers}
                        setSelect={setCreators}
                    ></Select>
                    <Button
                        Click={() =>
                            createNewTeam(
                                newTeam,
                                UserId,
                                UserExperience,
                                navigate,
                            )
                        }
                        Type={ButtonTypes.active}
                        Title="Создать команду"
                        Variants={formItem}
                    ></Button>
                </motion.form>
            </div>
        );
    } else if (!UserCanChanging) {
        return <Navigate to={AppRoutes.TEAMS}></Navigate>;
    }
};

export { CreateTeamPage };

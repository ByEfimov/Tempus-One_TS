import Styles from './Styles.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import Input, { InputTypes } from 'Assets/Tempus-Ui/Components/Inputs/Input';
import TextArea from 'Assets/Tempus-Ui/Components/Inputs/TextArea';
import LoadImage, {
    LoadImageColors,
} from 'Assets/Tempus-Ui/Components/LoadImage/LoadImage';
import Select, { SelectTypes } from 'Assets/Tempus-Ui/Components/Select/Select';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import {
    teamDirections,
    teamMembers,
} from 'Types/TypesOfData/team-or-user/team-directions';
import AppRoutes from 'Utils/routes/app-routes';
import isObjectValuesNotEmpty from 'Utils/validate-data/not-empty-values';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateTeam = () => {
    const { UserCanChanging, UserId, UserExperience } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [direction, setDirection] = useState('');
    const [creators, setCreators] = useState('');

    const NewTeam = {
        title: title,
        desc: description,
        image: image,
        direction: direction,
        creators: creators,
        members: {
            [UserId]: { UserId: UserId, UserRole: 'Administrator' },
        },
    };

    function createNewTeam() {
        if (isObjectValuesNotEmpty(NewTeam)) {
            postRequestWithNewId('teams/', NewTeam).then(() => {
                changeRequest(
                    'users/' + UserId,
                    '/experience',
                    UserExperience + 80,
                );
                navigate(AppRoutes.TEAMS);
            });
        } else {
            ErrorNotification('Не все поля заполнены.');
        }
    }

    if (UserCanChanging) {
        return (
            <div className={Styles.Container}>
                <motion.form
                    onSubmit={(e) => e.preventDefault()}
                    className={Styles.Form}
                    variants={formContainer}
                    initial="hidden"
                    animate="visible"
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
                        Change={(e) => setTitle(e.target.value)}
                        Value={title}
                        Type={InputTypes.text}
                        Variants={formItem}
                    ></Input>
                    <TextArea
                        Placeholder="Описание"
                        Change={(e) => setDescription(e.target.value)}
                        Value={description}
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
                        Click={createNewTeam}
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

export default CreateTeam;

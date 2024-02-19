import { NewTeamType } from './Page';
import Styles from './styles.module.scss';
import {
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
import {
    teamDirections,
    teamMembers,
} from '@/Types/TypesOfData/team-or-user/team-directions';
import { motion } from 'framer-motion';

interface CreateNewTeamForm {
    newTeam: NewTeamType;
    setNewTeam: React.Dispatch<React.SetStateAction<NewTeamType>>;
    children: React.ReactNode;
}

const CreateNewTeamForm = ({
    newTeam,
    setNewTeam,
    children,
}: CreateNewTeamForm) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setNewTeam({
            ...newTeam,
            [name]: value,
        });
    };

    return (
        <motion.form
            onSubmit={(e) => e.preventDefault()}
            className={Styles.Form}
            {...formContainer}
        >
            <LoadImage
                Colors={LoadImageColors.Default}
                Path="TeamsLogos"
                Callback={(imageUrl: string) =>
                    setNewTeam({ ...newTeam, image: imageUrl })
                }
                Image={newTeam.image}
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
                setSelect={(value: string) =>
                    setNewTeam({ ...newTeam, direction: value })
                }
            ></Select>
            <Select
                Type={SelectTypes.Input}
                Placeholder="Участники команды"
                Array={teamMembers}
                setSelect={(value: string) =>
                    setNewTeam({ ...newTeam, creators: value })
                }
            ></Select>
            {children}
        </motion.form>
    );
};

export default CreateNewTeamForm;

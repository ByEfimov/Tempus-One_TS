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
import TextArea from 'Assets/Tempus-Ui/Components/Inputs/TextArea';
import LoadImage, {
    LoadImageColors,
} from 'Assets/Tempus-Ui/Components/LoadImage/LoadImage';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

interface SettingsTeamModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    team: OpenTeamType;
}

const SettingsTeamModal: FC<SettingsTeamModal> = ({ setModalOpen, team }) => {
    const [teamPhoto, setTeamPhoto] = useState('');
    const [teamTitle, setTeamTitle] = useState('');
    const [teamDesc, setTeamDesc] = useState('');

    function ChangeFunction() {
        if (teamPhoto !== '') {
            changeRequest('teams/' + team.id, '/image', teamPhoto);
        }
        if (teamTitle !== '') {
            changeRequest('teams/' + team.id, '/title', teamTitle);
        }
        if (teamDesc !== '') {
            changeRequest('teams/' + team.id, '/desc', teamDesc);
        }
        CloseModal();
    }

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div className={Styles.SettingsModal}>
                <LoadImage
                    Path="TeamsLogos"
                    Colors={LoadImageColors.Primary}
                    Callback={setTeamPhoto}
                    Image={teamPhoto}
                ></LoadImage>
                <Input
                    Placeholder="Название"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setTeamTitle(e.currentTarget.value);
                    }}
                    Value={teamTitle}
                    Type={InputTypes.text}
                ></Input>
                <TextArea
                    Placeholder="Описание"
                    Change={(e) => setTeamDesc(e.target.value)}
                    Value={teamDesc}
                    Color={InputColors.primary}
                ></TextArea>
                <Button
                    Title="Применить"
                    Click={ChangeFunction}
                    Type={ButtonTypes.active}
                ></Button>
            </motion.div>
        </IsModal>
    );
};

export default SettingsTeamModal;

import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import changeTeamData from 'Api/Teams/change-team-data';
import ButtonVoid from 'Components/mini-components/button';
import CustomInput from 'Components/mini-components/input';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import { handleImageUpload } from 'Utils/Handlers/HandlerImageUpload';
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
            changeTeamData('image', teamPhoto, team.id);
        }
        if (teamTitle !== '') {
            changeTeamData('title', teamTitle, team.id);
        }
        if (teamDesc !== '') {
            changeTeamData('desc', teamDesc, team.id);
        }
        CloseModal();
    }

    return (
        <IsModal title="Настройки" setModalOpen={setModalOpen}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageUpload(e, setTeamPhoto)}
            />
            <CustomInput
                placeholder="Название"
                mode="large"
                changeFunction={(e) => {
                    setTeamTitle(e.currentTarget.value);
                }}
            ></CustomInput>
            <CustomInput
                placeholder="Описание"
                mode="large"
                changeFunction={(e) => {
                    setTeamDesc(e.currentTarget.value);
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

export default SettingsTeamModal;

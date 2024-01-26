import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import ButtonVoid from 'Components/mini-components/button';
import CustomInput from 'Components/mini-components/input';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { handleImageUpload } from 'Utils/handlers/handler-image-upload';
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

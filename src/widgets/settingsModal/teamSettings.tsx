import Styles from './styles.module.scss';
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
} from '@/app/assets/Tempus-Ui';
import { takeUserXp } from '@/app/providers/levelProvider';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { teamMembers } from '@/app/types/TypesOfData/team-or-user/team-directions';
import { changeRequest } from '@/features/api/requests/change-request';
import { removeRequest } from '@/features/api/requests/remove-request';
import { CloseModal, IsModal } from '@/shared/isModal';
import AppRoutes from '@/shared/routes/app-routes';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsTeamModal {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  team: OpenTeamType;
}

const SettingsTeamModal: FC<SettingsTeamModal> = ({ setModalOpen, team }) => {
  const navigator = useNavigate();
  const [form, setForm] = useState({
    photo: '',
    creators: '',
    title: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const ChangeFunction = () => {
    const defaultPath = 'teams/' + team.id;
    (Object.keys(form) as (keyof typeof form)[]).forEach((field) => {
      if (form[field] !== '') {
        changeRequest(defaultPath, `/${field}`, form[field]);
      }
    });

    CloseModal();
  };

  function removeTeam() {
    removeRequest('teams/', team.id);
    takeUserXp(80);
    navigator(AppRoutes.TEAMS);
  }

  return (
    <IsModal setModalOpen={setModalOpen}>
      <motion.div {...formContainer} className={Styles.SettingsModal}>
        <LoadImage
          Variants={formItem}
          Path="TeamsLogos"
          Colors={LoadImageColors.Primary}
          Callback={(imageUrl: string) => {
            setForm({ ...form, photo: imageUrl });
          }}
          Image={form.photo}
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
            setForm({ ...form, creators: select });
          }}
          Placeholder="Участники команды"
          Type={SelectTypes.Input}
          Color={InputColors.primary}
        ></Select>
        <Button Variants={formItem} Type={ButtonTypes.error} Click={removeTeam} Title="Удалить сообщество"></Button>
        <Button Variants={formItem} Title="Применить" Click={ChangeFunction} Type={ButtonTypes.active}></Button>
      </motion.div>
    </IsModal>
  );
};

export default SettingsTeamModal;

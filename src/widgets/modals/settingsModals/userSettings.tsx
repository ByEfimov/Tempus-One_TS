import { CloseModal, IsModal } from '../../../shared/modals/isModal';
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
  formContainer,
  formItem,
} from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { getSpecializations } from '@/features/api/Users/interaction/GetSpecializations';
import { changeRequest } from '@/features/api/requests/change-request';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

interface SettingsUserModal {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsUserModal: FC<SettingsUserModal> = ({ setModalOpen }) => {
  const [allSpecializations, setAllSpecializations] = useState<{ label: string; value: string }[]>();
  const user = useAuth();
  const [form, setForm] = useState<{ photo: string; name: string; age: string; specialization: string }>({
    photo: '',
    name: '',
    age: '',
    specialization: '',
  });

  const ChangeFunction = () => {
    const defaultPath = 'users/' + user.id;

    if (form.photo !== '') {
      changeRequest(defaultPath, '/photo', form.photo);
    }
    if (form.name !== '') {
      changeRequest(defaultPath, '/name', form.name);
    }
    if (form.age !== '') {
      changeRequest(defaultPath, '/age', form.age);
    }
    if (form.specialization !== '') {
      changeRequest(defaultPath, '/specialization', form.specialization);
    }

    CloseModal();
  };

  useEffect(() => {
    getSpecializations(setAllSpecializations);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <IsModal setModalOpen={setModalOpen}>
      <motion.div {...formContainer} className={Styles.SettingsModal}>
        <LoadImage
          Callback={(imageUrl: string) => {
            setForm({ ...form, photo: imageUrl });
          }}
          Path="UsersLogos"
          Image={form.photo}
          Colors={LoadImageColors.Primary}
          Variants={formItem}
        ></LoadImage>
        <Input
          Name="name"
          Placeholder="Имя"
          Color={InputColors.primary}
          Change={handleChange}
          Value={form.name}
          Variants={formItem}
          Type={InputTypes.text}
        ></Input>
        <Input
          Name="age"
          Color={InputColors.primary}
          Placeholder="Возраст"
          Change={handleChange}
          Value={form.age}
          Variants={formItem}
          Type={InputTypes.number}
        ></Input>
        <Select
          Array={allSpecializations}
          setSelect={(value: string) => {
            setForm({ ...form, specialization: value });
          }}
          Placeholder="Выберите профессию"
          Type={SelectTypes.Input}
          Color={InputColors.primary}
        ></Select>

        <Button Variants={formItem} Title="Применить" Click={ChangeFunction} Type={ButtonTypes.active}></Button>
      </motion.div>
    </IsModal>
  );
};

export default SettingsUserModal;

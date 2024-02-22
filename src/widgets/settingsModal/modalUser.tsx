import { CloseModal, IsModal } from '../../shared/isModal';
import Styles from './styles.module.scss';
import { changeRequest } from '@/app/api/requests/change-request';
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
import { getSpecializations } from '@/features/GetSpecializations';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

interface SettingsUserModal {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsUserModal: FC<SettingsUserModal> = ({ setModalOpen }) => {
  const [allSpecializations, setAllSpecializations] = useState<{ label: string; value: string }[]>();
  const { UserId } = useAuth();
  const [form, setForm] = useState({
    photo: '',
    name: '',
    age: '',
    specialization: '',
  });

  function ChangeFunction() {
    const defaultPath = 'users/' + UserId;

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
  }

  useEffect(() => {
    getSpecializations(setAllSpecializations);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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
          Placeholder="Имя"
          Color={InputColors.primary}
          Change={handleChange}
          Value={form.name}
          Variants={formItem}
          Type={InputTypes.text}
        ></Input>
        <Input
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

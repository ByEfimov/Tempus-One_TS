import FormsStyles from './styles.module.scss';
import { Button, ButtonTypes, Input, InputTypes, TextWithLine, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import AuthWithGoogle from '@/pages/authentication/Page';
import AppRoutes from '@/shared/routes/app-routes';
import { validateAuthenticationForm } from '@/shared/validate-data/validate-authentication-form';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export type AuthenticationFromData = {
  email: string;
  password: string;
  name?: string;
  age?: string;
};

interface AuthenticationFromProps {
  title: string;
  handlerSubmit: ({ email, password, name, age }: AuthenticationFromData) => void;
}

const AuthenticationFrom: FC<AuthenticationFromProps> = ({ title, handlerSubmit }) => {
  const location = useLocation().pathname;
  const Path = '/' + location.split('/')[1];

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          validateAuthenticationForm(form, title, handlerSubmit);
        }}
        className={FormsStyles.AuthForm}
        {...formContainer}
      >
        <motion.h1 variants={formItem} className={FormsStyles.AuthForm__Title}>
          {title}
        </motion.h1>

        <div className={FormsStyles.AuthForm__InputWrapper}>
          <Input Placeholder="Ваша почта" Change={handleChange} Variants={formItem} Type={InputTypes.email}></Input>

          <Input Placeholder="Ваш пароль" Change={handleChange} Type={InputTypes.password} Variants={formItem}></Input>

          {Path === AppRoutes.REGISTER && (
            <motion.div variants={formItem} className={FormsStyles.moreInputs}>
              <Input Placeholder="Имя" Change={handleChange} Type={InputTypes.text} MaxLength={15}></Input>
              <Input Placeholder="Возраст" Change={handleChange} Type={InputTypes.number}></Input>
            </motion.div>
          )}
        </div>
        <Button
          Title={Path === AppRoutes.REGISTER ? 'Зарегестрироваться' : 'Войти'}
          Click={() => {}}
          Variants={formItem}
          Type={ButtonTypes.active}
        ></Button>
      </motion.form>
      <div className={FormsStyles.BottomForm}>
        <TextWithLine>Или</TextWithLine>
        <AuthWithGoogle />
        <div className={FormsStyles.nextForm}>
          {Path === AppRoutes.REGISTER ? (
            <h4>
              Уже есть аккаунт? <Link to={AppRoutes.LOGIN}>Войди!</Link>
            </h4>
          ) : (
            <h4>
              Еще нет аккаунта? <Link to={AppRoutes.REGISTER}>Зарегестрируйся!</Link>
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthenticationFrom;

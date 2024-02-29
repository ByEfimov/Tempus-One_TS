import FormsStyles from './styles.module.scss';
import { Button, ButtonTypes, Input, InputTypes, TextWithLine, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import AuthWithGoogle from '@/pages/authentication/Page';
import AppRoutes from '@/shared/routes/app-routes';
import { validateAuthenticationForm } from '@/shared/validate-data/validateAuthenticationForm';
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
    name: Path === AppRoutes.REGISTER ? '' : undefined,
    age: Path === AppRoutes.REGISTER ? '' : undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAuthenticationForm(form, title, handlerSubmit);
  };

  return (
    <>
      <motion.form onSubmit={handleSubmit} className={FormsStyles.AuthForm} {...formContainer}>
        <motion.h1 variants={formItem} className={FormsStyles.AuthForm__Title}>
          {title}
        </motion.h1>

        <div className={FormsStyles.AuthForm__InputWrapper}>
          <Input
            Placeholder="Ваша почта"
            Change={handleChange}
            Variants={formItem}
            Type={InputTypes.email}
            Name="email"
          ></Input>
          <Input
            Placeholder="Ваш пароль"
            Change={handleChange}
            Type={InputTypes.password}
            Variants={formItem}
            Name="password"
          ></Input>

          {Path === AppRoutes.REGISTER && (
            <motion.div variants={formItem} className={FormsStyles.moreInputs}>
              <Input Placeholder="Имя" Change={handleChange} Type={InputTypes.text} MaxLength={15} Name="name"></Input>
              <Input Placeholder="Возраст" Change={handleChange} Type={InputTypes.number} Name="age"></Input>
            </motion.div>
          )}
        </div>

        <Button
          Title={Path === AppRoutes.REGISTER ? 'Зарегистрироваться' : 'Войти'}
          Click={() => {}}
          Variants={formItem}
          Type={ButtonTypes.active}
        ></Button>
      </motion.form>

      <div className={FormsStyles.BottomForm}>
        <TextWithLine>Или</TextWithLine>
        <AuthWithGoogle />

        <div className={FormsStyles.nextForm}>
          <h4>
            {Path === AppRoutes.REGISTER ? 'Уже есть аккаунт? ' : 'Еще нет аккаунта? '}
            <Link to={Path === AppRoutes.REGISTER ? AppRoutes.LOGIN : AppRoutes.REGISTER}>
              {Path === AppRoutes.REGISTER ? 'Войди!' : 'Зарегистрируйся!'}
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
};

export default AuthenticationFrom;

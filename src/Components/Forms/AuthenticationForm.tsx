import AuthWithGoogle from '../../Pages/Authentication/AuthWithGoogle';
import FormsStyles from './FormsStyles.module.scss';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import Input, { InputTypes } from 'Assets/Tempus-Ui/Components/Inputs/Input';
import TextWithLine from 'Assets/Tempus-Ui/Components/Texts/Text-with-line';
import AppRoutes from 'Utils/Routes/app-routes';
import { validateAuthenticationForm } from 'Utils/ValidateData/validateAuthenticationForm';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AuthenticationFromProps {
    title: string;
    handlerSubmit: (
        Email: string,
        Pass: string,
        Name: string,
        Age: string,
    ) => void;
}

const AuthenticationFrom: FC<AuthenticationFromProps> = ({
    title,
    handlerSubmit,
}) => {
    const location = useLocation().pathname;
    const Path = '/' + location.split('/')[1];

    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Name, setName] = useState('');
    const [Age, setAge] = useState('');

    return (
        <>
            <motion.form
                onSubmit={(e) => {
                    e.preventDefault();
                    validateAuthenticationForm(
                        Pass,
                        Email,
                        Name,
                        Age,
                        title,
                        handlerSubmit,
                    );
                }}
                className={FormsStyles.AuthForm}
                variants={formContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    variants={formItem}
                    className={FormsStyles.AuthForm__Title}
                >
                    {title}
                </motion.h1>

                <div className={FormsStyles.AuthForm__InputWrapper}>
                    <Input
                        Placeholder="Ваша почта"
                        Change={(e) => setEmail(e.target.value)}
                        Value={Email}
                        Variants={formItem}
                        Type={InputTypes.email}
                    ></Input>

                    <Input
                        Placeholder="Ваш пароль"
                        Change={(e) => setPass(e.target.value)}
                        Value={Pass}
                        Type={InputTypes.password}
                        Variants={formItem}
                    ></Input>

                    {Path === AppRoutes.REGISTER && (
                        <motion.div
                            variants={formItem}
                            className={FormsStyles.moreInputs}
                        >
                            <Input
                                Placeholder="Имя"
                                Change={(e) => setName(e.target.value)}
                                Value={Name}
                                Type={InputTypes.text}
                                MaxLength={15}
                            ></Input>
                            <Input
                                Placeholder="Возраст"
                                Change={(e) => setAge(e.target.value)}
                                Value={Age}
                                Type={InputTypes.number}
                            ></Input>
                        </motion.div>
                    )}
                </div>
                <Button
                    Title={
                        Path === AppRoutes.REGISTER
                            ? 'Зарегестрироваться'
                            : 'Войти'
                    }
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
                            Уже есть аккаунт?{' '}
                            <Link to={AppRoutes.LOGIN}>Войди!</Link>
                        </h4>
                    ) : (
                        <h4>
                            Еще нет аккаунта?{' '}
                            <Link to={AppRoutes.REGISTER}>
                                Зарегестрируйся!
                            </Link>
                        </h4>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthenticationFrom;

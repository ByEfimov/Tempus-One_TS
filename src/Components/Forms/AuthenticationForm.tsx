import AuthWithGoogle from '../../Pages/Authentication/AuthWithGoogle';
import FormsStyles from './FormsStyles.module.scss';
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
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };
    const item = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };
    return (
        <>
            <motion.ul variants={container} initial="hidden" animate="visible">
                <form
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
                >
                    <motion.li variants={item}>
                        <div className={FormsStyles.AuthForm__Title}>
                            {title}
                        </div>
                    </motion.li>

                    <div className={FormsStyles.AuthForm__InputWrapper}>
                        <motion.li variants={item}>
                            <Input
                                Placeholder="Ваша почта"
                                Change={(e) => setEmail(e.target.value)}
                                Value={Email}
                                Type={InputTypes.email}
                            ></Input>
                        </motion.li>
                        <motion.li variants={item}>
                            <Input
                                Placeholder="Ваш пароль"
                                Change={(e) => setPass(e.target.value)}
                                Value={Pass}
                                Type={InputTypes.password}
                            ></Input>
                        </motion.li>
                        {Path === AppRoutes.REGISTER && (
                            <motion.li variants={item}>
                                <div className={FormsStyles.moreInputs}>
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
                                        DefaultValue="03"
                                        Type={InputTypes.number}
                                    ></Input>
                                </div>
                            </motion.li>
                        )}
                    </div>
                    <motion.li variants={item}>
                        <Button
                            Title={
                                Path === AppRoutes.REGISTER
                                    ? 'Зарегестрироваться'
                                    : 'Войти'
                            }
                            Click={() => {}}
                            Type={ButtonTypes.active}
                        ></Button>
                    </motion.li>
                </form>
            </motion.ul>

            <div className={FormsStyles.BottomForm}>
                <TextWithLine>Или</TextWithLine>
                <AuthWithGoogle />
                <div className={FormsStyles.nextForm}>
                    {Path === AppRoutes.REGISTER ? (
                        <div>
                            Уже есть аккаунт?{' '}
                            <Link to={AppRoutes.LOGIN}>Войди!</Link>
                        </div>
                    ) : (
                        <div>
                            Еще нет аккаунта?{' '}
                            <Link to={AppRoutes.REGISTER}>
                                Зарегестрируйся!
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AuthenticationFrom;

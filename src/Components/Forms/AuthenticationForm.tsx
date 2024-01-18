import AuthWithGoogle from '../../Pages/Authentication/AuthWithGoogle';
import FormsStyles from './FormsStyles.module.scss';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import Input, { InputTypes } from 'Assets/Tempus-Ui/Components/Inputs/Input';
import TextWithLine from 'Assets/Tempus-Ui/Components/Texts/Text-with-line';
import AppRoutes from 'Utils/Routes/app-routes';
import { validateAuthenticationForm } from 'Utils/ValidateData/validateAuthenticationForm';
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
                <div className={FormsStyles.AuthForm__Title}>{title}</div>

                <div className={FormsStyles.AuthForm__InputWrapper}>
                    <Input
                        Placeholder="Ваша почта"
                        Change={(e) => setEmail(e.target.value)}
                        Value={Email}
                        Type={InputTypes.email}
                    ></Input>
                    <Input
                        Placeholder="Ваш пароль"
                        Change={(e) => setPass(e.target.value)}
                        Value={Pass}
                        Type={InputTypes.password}
                    ></Input>
                    {Path === AppRoutes.REGISTER && (
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
                    )}
                </div>

                <Button
                    Title={
                        Path === AppRoutes.REGISTER
                            ? 'Зарегестрироваться'
                            : 'Войти'
                    }
                    Click={() => {}}
                    Type={ButtonTypes.active}
                ></Button>
            </form>
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

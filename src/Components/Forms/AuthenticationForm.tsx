import EmailIcon from '../../Assets/Tempus-Ui/Icons/Inputs/email.svg';
import LockIcon from '../../Assets/Tempus-Ui/Icons/Inputs/lock.svg';
import GiftIcon from '../../Assets/Tempus-Ui/Icons/Users/gift.svg';
import UserIcon from '../../Assets/Tempus-Ui/Icons/Users/user.svg';
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
        <form
            className={FormsStyles.Container}
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
        >
            <div className={FormsStyles.AuthForm}>
                <div className={FormsStyles.Title}>{title}</div>

                <div className={FormsStyles.InputWrapper}>
                    <Input
                        Placeholder="Ваша почта"
                        Change={(e) => setEmail(e.target.value)}
                        Value={Email}
                        Icon={EmailIcon}
                        Type={InputTypes.email}
                    ></Input>
                    <Input
                        Placeholder="Ваш пароль"
                        Change={(e) => setPass(e.target.value)}
                        Value={Pass}
                        Icon={LockIcon}
                        Type={InputTypes.password}
                    ></Input>
                    {Path === AppRoutes.REGISTER && (
                        <div className={FormsStyles.moreInputs}>
                            <Input
                                Placeholder="Имя"
                                Change={(e) => setName(e.target.value)}
                                Value={Name}
                                Icon={UserIcon}
                                Type={InputTypes.text}
                                MaxLength={12}
                            ></Input>
                            <Input
                                Placeholder="Возраст"
                                Change={(e) => setAge(e.target.value)}
                                Value={Age}
                                DefaultValue="03"
                                Icon={GiftIcon}
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
            </div>

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
        </form>
    );
};

export default AuthenticationFrom;

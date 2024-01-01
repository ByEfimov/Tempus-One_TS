import AuthWithGoogle from '../../Pages/Authentication/AuthWithGoogle';
import FormsStyles from './FormsStyles.module.scss';
import ButtonVoid from 'Components/MiniComponents/button';
import validateEmail from 'Utils/ValidateData/ValidateEmail';
import validatePassword from 'Utils/ValidateData/ValidatePassword';
import { validateAuthenticationForm } from 'Utils/ValidateData/validateAuthenticationForm';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

interface AuthenticationFromProps {
    title: string;
    handlerSubmit: (
        Email: string,
        Pass: string,
        Name: string,
        Age: number,
    ) => void;
}

const AuthenticationFrom: FC<AuthenticationFromProps> = ({
    title,
    handlerSubmit,
}) => {
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Name, setName] = useState('');
    const [Age, setAge] = useState(0);

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
                    <input
                        type="email"
                        className={
                            (validateEmail(Email) && FormsStyles.validInput) ||
                            undefined
                        }
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Почта"
                    />
                    <input
                        type="password"
                        className={
                            (validatePassword(Pass) &&
                                FormsStyles.validInput) ||
                            undefined
                        }
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Пароль"
                    />
                    {title === 'Регистрация' && (
                        <div className={FormsStyles.moreInputs}>
                            <input
                                type="text"
                                placeholder="Имя"
                                maxLength={12}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Возраст"
                                onChange={(e) =>
                                    setAge(parseInt(e.target.value))
                                }
                            />
                        </div>
                    )}
                </div>

                <ButtonVoid
                    title="Продолжить"
                    clickHandler={() => {}}
                    classes={FormsStyles.button}
                ></ButtonVoid>
                <AuthWithGoogle />
            </div>
            <div className={FormsStyles.nextForm}>
                {title === 'Регистрация' ? (
                    <div>
                        Или <Link to="/Login">Войди в аккаунт!</Link>
                    </div>
                ) : (
                    <div>
                        Или <Link to="/Register">Зарегистрируйся!</Link>
                    </div>
                )}
            </div>
        </form>
    );
};

export default AuthenticationFrom;

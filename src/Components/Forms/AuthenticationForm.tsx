import FormsStyles from './FormsStyles.module.scss';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonVoid from '../minicops/B-void';
import AuthWhithGoogle from './AuthWhithGoogle';

interface AuthenticationFromProps {
    title: string;
    handlerSubmit: (
        inputEmail: string,
        inputPass: string,
        inputName: string,
        inputAge: number
    ) => void;
}

const AuthenticationFrom: FC<AuthenticationFromProps> = ({
    title,
    handlerSubmit,
}) => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputAge, setInputAge] = useState(0);

    function validatePassword(password: string) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        return regex.test(password);
    }
    function validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    return (
        <form
            className={FormsStyles.Container}
            onSubmit={(e) => {
                e.preventDefault();
                if (validatePassword(inputPass) && validateEmail(inputEmail)) {
                    handlerSubmit(
                        inputEmail,
                        inputPass,
                        inputName && inputName,
                        inputAge && inputAge
                    );
                }
            }}
        >
            <div className={FormsStyles.AuthForm}>
                <div className={FormsStyles.Title}>{title}</div>
                <input
                    type="email"
                    className={
                        (validateEmail(inputEmail) && FormsStyles.validInput) ||
                        undefined
                    }
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Почта"
                />
                <input
                    type="password"
                    className={
                        (validatePassword(inputPass) &&
                            FormsStyles.validInput) ||
                        undefined
                    }
                    onChange={(e) => setInputPass(e.target.value)}
                    placeholder="Пароль"
                />
                {title === 'Регистрация' && (
                    <div className={FormsStyles.moreInputs}>
                        <input
                            type="text"
                            placeholder="Имя"
                            onChange={(e) => setInputName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Возраст"
                            onChange={(e) =>
                                setInputAge(parseInt(e.target.value))
                            }
                        />
                    </div>
                )}
                <ButtonVoid
                    title="Продолжить"
                    clickHandler={() => {}}
                    classes={
                        (validateEmail(inputEmail) &&
                            validatePassword(inputPass) &&
                            FormsStyles.ActiveButton) ||
                        undefined
                    }
                ></ButtonVoid>
                <AuthWhithGoogle />
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

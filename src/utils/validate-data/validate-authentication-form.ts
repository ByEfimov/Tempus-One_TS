import validateEmail from './validate-email';
import validatePassword from './validate-password';
import { ErrorNotification } from 'Components/notifications/notifications';

export const validateAuthenticationForm = (
    Pass: string,
    Email: string,
    Name: string,
    Age: string,
    title: string,
    handlerSubmit: (
        Email: string,
        Pass: string,
        Name: string,
        Age: string,
    ) => void,
) => {
    if (!validatePassword(Pass)) {
        ErrorNotification('Пароль не подходит.');
    } else if (!validateEmail(Email)) {
        ErrorNotification('Почта не подходит.');
    } else if (title === 'Регистрация' && Name.length < 5) {
        ErrorNotification('Имя должно быть длиннее 5 букв.');
    } else {
        handlerSubmit(Email, Pass, Name, Age);
    }
};

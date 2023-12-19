import validateEmail from './ValidateEmail';
import validatePassword from './ValidatePassword';
import { ErrorNotification } from 'Components/Notifications/Notifications';

export const validateAuthenticationForm = (
    Pass: string,
    Email: string,
    Name: string,
    Age: number,
    title: string,
    handlerSubmit: (
        Email: string,
        Pass: string,
        Name: string,
        Age: number
    ) => void
) => {
    if (!validatePassword(Pass)) {
        ErrorNotification('Пароль не подходит.');
    } else if (!validateEmail(Email)) {
        ErrorNotification('Почта не подходит.');
    } else if (title === 'Регистрация' && Name.length < 5) {
        ErrorNotification('Имя должно быть длиннее 5 букв.');
    } else if (title === 'Регистрация' && Age < 5) {
        ErrorNotification('Вам должно быть больше 5 лет.');
    } else {
        handlerSubmit(Email, Pass, Name, Age);
    }
};

import validateEmail from './validate-email';
import validatePassword from './validate-password';
import { AuthenticationFromData } from '@/entities/authenticationForm/authenticationForm';
import { ErrorNotification } from '@/features/notifications/notifications';

export const validateAuthenticationForm = (
    { email, password, name, age }: AuthenticationFromData,
    title: string,
    handlerSubmit: ({
        email,
        password,
        name,
        age,
    }: AuthenticationFromData) => void,
) => {
    if (!validatePassword(password)) {
        ErrorNotification('Пароль не подходит.');
    } else if (!validateEmail(email)) {
        ErrorNotification('Почта не подходит.');
    } else if (title === 'Регистрация' && (name || '').length < 5) {
        ErrorNotification('Имя должно быть длиннее 5 букв.');
    } else {
        handlerSubmit({ email, password, name, age });
    }
};
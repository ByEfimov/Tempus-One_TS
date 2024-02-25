import validateEmail from './validate-email';
import validatePassword from './validate-password';
import { AuthenticationFromData } from '@/entities/authenticationForm/authenticationForm';
import { toast } from 'react-toastify';

export const validateAuthenticationForm = (
  { email, password, name, age }: AuthenticationFromData,
  title: string,
  handlerSubmit: ({ email, password, name, age }: AuthenticationFromData) => void,
) => {
  if (!validatePassword(password)) {
    toast.error('Пароль не подходит.');
  } else if (!validateEmail(email)) {
    toast.error('Почта не подходит.');
  } else if (title === 'Регистрация' && (name || '').length < 5) {
    toast.error('Имя должно быть длиннее 5 букв.');
  } else {
    handlerSubmit({ email, password, name, age });
  }
};

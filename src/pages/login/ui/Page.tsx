import loginUser from '../api/loginUser';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import AuthenticationFrom from '@/entities/authenticationForm/authenticationForm';
import { setCookieOnAnotherDomain } from '@/features/cookie/setCookieOnAnotherDomain';
import AppRoutes from '@/shared/routes/app-routes';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const user = useAuth();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function getCookie(cookieName: string) {
    const name = cookieName + '=';
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookies.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return '';
  }

  // Вызов функции для чтения куки

  useEffect(() => {
    setCookieOnAnotherDomain('yourCookieName', 'yourCookieValue', 'https://tempus-one-ts.vercel.app');
    console.log('Значение куки на другом сайте: ' + getCookie('yourCookieName'));
  }, []);

  return !user.isAuth ? (
    <AuthenticationFrom
      title="Войди в свой 
						Аккаунт"
      handlerSubmit={(formData) => loginUser(formData, dispatch, navigate)}
    ></AuthenticationFrom>
  ) : (
    <Navigate to={AppRoutes.DEFAULT}></Navigate>
  );
}

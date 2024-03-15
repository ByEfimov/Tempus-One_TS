import loginUser from '../api/loginUser';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import AuthenticationFrom from '@/entities/authenticationForm/authenticationForm';
import AppRoutes from '@/shared/routes/app-routes';
import { Navigate, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const user = useAuth();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

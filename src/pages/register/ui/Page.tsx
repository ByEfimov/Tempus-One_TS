import { registerUser } from '../api/registerUser';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import AuthenticationFrom from '@/entities/authenticationForm/authenticationForm';
import AppRoutes from '@/shared/routes/app-routes';
import { Navigate, useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const user = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return !user.isAuth ? (
    <AuthenticationFrom
      title="Создай свой
						Аккаунт"
      handlerSubmit={(formData) => registerUser(formData, dispatch, navigate)}
    ></AuthenticationFrom>
  ) : (
    <Navigate to={AppRoutes.DEFAULT}></Navigate>
  );
}

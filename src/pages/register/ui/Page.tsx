import { registerUser } from '../api/registerUser';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import AuthenticationFrom from '@/entities/authenticationForm/authenticationForm';
import { encryptData } from '@/shared/crypt-data/cripting-data';
import AppRoutes from '@/shared/routes/app-routes';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export function RegisterPage() {
  const { microservice } = useParams();
  const user = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (user.isAuth && microservice) {
    if (microservice === 'quiz') {
      window.location.href = `https://tempus-quiz-ts.vercel.app/login/${encryptData(user.id)}`;
    } else {
      return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
    }
  }

  return !user.isAuth ? (
    <AuthenticationFrom
      title="Создай свой
						Аккаунт"
      handlerSubmit={(formData) => registerUser(formData, dispatch, navigate, microservice)}
    ></AuthenticationFrom>
  ) : (
    <Navigate to={AppRoutes.DEFAULT}></Navigate>
  );
}

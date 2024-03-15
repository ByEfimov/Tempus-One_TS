import loginUser from '../api/loginUser';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import AuthenticationFrom from '@/entities/authenticationForm/authenticationForm';
import { encryptData } from '@/shared/crypt-data/cripting-data';
import AppRoutes from '@/shared/routes/app-routes';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export function LoginPage() {
  const { microservice } = useParams();
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (user.isAuth && microservice) {
    if (microservice === 'quiz') {
      window.location.href = `https://tempus-quiz-ts.vercel.app/main/${encryptData(user.id)}`;
    } else {
      return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
    }
  }

  return !user.isAuth ? (
    <AuthenticationFrom
      title="Войди в свой 
						Аккаунт"
      microservice={microservice}
      handlerSubmit={(formData) => loginUser(formData, dispatch, navigate, microservice)}
    ></AuthenticationFrom>
  ) : (
    <Navigate to={AppRoutes.DEFAULT}></Navigate>
  );
}

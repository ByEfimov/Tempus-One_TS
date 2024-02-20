import loginUser from '../api/loginUser';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import AppRoutes from '@/Utils/routes/app-routes';
import AuthenticationFrom from '@/entities/authenticationForm/authenticationForm';
import { Navigate, useNavigate } from 'react-router-dom';

export function LoginPage() {
    const { UserIsAuth } = useAuth();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Войди в свой 
						Аккаунт"
            handlerSubmit={(formData) =>
                loginUser(formData, dispatch, navigate)
            }
        ></AuthenticationFrom>
    ) : (
        <Navigate to={AppRoutes.DEFAULT}></Navigate>
    );
}

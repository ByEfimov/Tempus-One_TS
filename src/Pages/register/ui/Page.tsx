import { registerUser } from '../api/registerUser';
import AuthenticationFrom from '@/Components/forms/authentication-form';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import AppRoutes from '@/Utils/routes/app-routes';
import { Navigate, useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Создай свой
						Аккаунт"
            handlerSubmit={(formData) =>
                registerUser(formData, dispatch, navigate)
            }
        ></AuthenticationFrom>
    ) : (
        <Navigate to={AppRoutes.DEFAULT}></Navigate>
    );
}

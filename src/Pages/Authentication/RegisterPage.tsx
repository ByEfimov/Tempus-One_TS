import AuthenticationFrom from '../../Components/Forms/AuthenticationForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export default function RegisterPage() {
    const { UserIsAuth } = useAuth();
    function handlerSubmit(
        inputEmail: string,
        inputPass: string,
        inputName: string,
        inputAge: number
    ) {
        console.error('Регистрация не доступна.');
    }
    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Регистрация"
            handlerSubmit={handlerSubmit}
        ></AuthenticationFrom>
    ) : (
        <Navigate to="/"></Navigate>
    );
}

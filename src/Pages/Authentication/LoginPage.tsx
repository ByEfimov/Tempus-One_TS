import { Navigate } from 'react-router-dom';
import AuthenticationFrom from '../../Components/Forms/AuthenticationForm';
import { useAuth } from '../../Hooks/useAuth';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { setUser } from '../../Store/slices/UserSlice';
import { UsersList } from '../../Api/Users';

export default function LoginPage() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();
    function handlerSubmit(inputEmail: string, inputPass: string) {
        UsersList.map((user) => {
            if (user.email === inputEmail && user.password === inputPass) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.id,
                        name: user.name,
                        age: user.age,
                        photo: user.photo,
                    })
                );
            }
        });
    }
    return !UserIsAuth ? (
        <AuthenticationFrom
            title="Вход"
            handlerSubmit={handlerSubmit}
        ></AuthenticationFrom>
    ) : (
        <Navigate to="/"></Navigate>
    );
}

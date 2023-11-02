import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import style from './style.module.css';

export default function NeedAuth() {
    const { UserIsAuth } = useAuth();
    return !UserIsAuth ? (
        <div className={style.wrapper}>
            <h1 className={style.text}>
                Для использования этой страницы нужно
                <Link to="/Login">Войти в аккаунт</Link>
            </h1>
        </div>
    ) : (
        <Navigate to="/"></Navigate>
    );
}

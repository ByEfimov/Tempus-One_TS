import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import style from './style.module.scss';
import { useEffect } from 'react';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import {
    TypesOfHeader,
    setHeader,
} from '../../Store/slices/Header/HeaderSlice';

export default function NeedAuth() {
    const { UserIsAuth } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setHeader({ Title: 'Войди', Type: TypesOfHeader.WithoutSearchBar })
        );
    }, []);

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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNotify } from 'Hooks/useNotify';
import Styles from './Styles.module.scss';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    clearNotify,
    setNotification,
} from 'Store/slices/Notifications/NotifySlice';
import { TypesOfNotifications } from 'Types/TypesOfData/Notifications/NotifyType';
import { LegacyRef, useEffect } from 'react';
import React from 'react';
import BellIcon from 'Assets/Icons/Notification/bell.svg';
import ErrorIcon from 'Assets/Icons/Notification/exclamation-triangle.svg';

let ErrorNotification = (_error: string) => {};
let MassageNotification = (_massage: string) => {};

const Notifications = () => {
    const { NotifyMassage, NotifyTimeLine, NotifyType } = useNotify();
    const NotifyRef: LegacyRef<HTMLDivElement> = React.createRef();
    const dispatch = useAppDispatch();

    ErrorNotification = (error: string) => {
        dispatch(
            setNotification({
                Type: TypesOfNotifications.Error,
                Massage: error,
            })
        );
    };

    MassageNotification = (massage: string) => {
        dispatch(
            setNotification({
                Type: TypesOfNotifications.Massage,
                Massage: massage,
            })
        );
    };

    useEffect(() => {
        if (NotifyTimeLine > 0) {
            setTimeout(() => {
                dispatch(clearNotify());
            }, NotifyTimeLine);
            setTimeout(() => {
                NotifyRef.current?.classList.add(Styles.NotificationClose);
            }, NotifyTimeLine - 500);
        }
    }, [NotifyTimeLine]);

    return (
        <>
            {NotifyTimeLine > 0 && (
                <div
                    className={
                        NotifyType === TypesOfNotifications.Massage
                            ? Styles.Notification
                            : Styles.NotificationError
                    }
                    ref={NotifyRef}
                >
                    <img
                        src={
                            NotifyType === TypesOfNotifications.Massage
                                ? BellIcon
                                : ErrorIcon
                        }
                        alt=""
                    />
                    <div className={Styles.Text}>{NotifyMassage}</div>
                </div>
            )}
        </>
    );
};

export { Notifications, ErrorNotification, MassageNotification };

import Styles from './Styles.module.scss';
import BellIcon from '@/Assets/Icons/Notification/bell.svg';
import ErrorIcon from '@/Assets/Icons/Notification/exclamation-triangle.svg';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { useNotify } from '@/Hooks/useNotify';
import {
    clearNotify,
    setNotification,
} from '@/Store/slices/Notifications/NotifySlice';
import { TypesOfNotifications } from '@/Types/TypesOfData/notifications/notify-type';
import React, { LegacyRef, useEffect } from 'react';

let ErrorNotification: (error: string) => void;
let MassageNotification: (massage: string) => void;

const Notifications = () => {
    const { NotifyMassage, NotifyTimeLine, NotifyType } = useNotify();
    const NotifyRef: LegacyRef<HTMLDivElement> = React.createRef();
    const dispatch = useAppDispatch();

    ErrorNotification = (error: string) => {
        dispatch(
            setNotification({
                Type: TypesOfNotifications.Error,
                Massage: error,
            }),
        );
    };

    MassageNotification = (massage: string) => {
        dispatch(
            setNotification({
                Type: TypesOfNotifications.Massage,
                Massage: massage,
            }),
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

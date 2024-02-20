import Styles from './styles.module.scss';
import { getRequestObject } from '@/Api/requests/get-requests';
import { Preloader } from '@/Assets/Tempus-Ui';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { setExecuteButton } from '@/Store/slices/header/header-slice';
import { OpenUserType } from '@/Types/TypesOfData/team-or-user/open-user-type';
import ShowPosts from '@/entities/post/showPosts';
import { ErrorNotification } from '@/features/notifications/notifications';
import SubscribeButton from '@/features/subscribeButton/SubscribeButton';
import UserData from '@/widgets/userData/userData';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function UserPage() {
  const { id } = useParams();
  const [OpenUser, setOpenUser] = useState<OpenUserType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRequestObject('users/' + id)
      .then((user) => {
        setOpenUser(user);
      })
      .catch(() => ErrorNotification('Пользователь не найден.'));
  }, []);

  useEffect(() => {
    dispatch(
      setExecuteButton({
        button: {
          component: <SubscribeButton WhoWrotePost={OpenUser} id={OpenUser?.id} />,
        },
      }),
    );
  }, [OpenUser]);

  if (!OpenUser) {
    return <Preloader></Preloader>;
  }
  return (
    <>
      <UserData OpenUser={OpenUser} />
      <motion.div className={Styles.UserPosts}>
        <ShowPosts ShowTitle AuthorFilter={OpenUser.id} />
      </motion.div>
    </>
  );
}

import Styles from './styles.module.scss';
import { Preloader, formContainer } from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { setExecuteButton } from '@/app/slices/header/headerSlice';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import ShowPosts from '@/entities/post/showPosts';
import { getRequestObject } from '@/features/api/requests/get-requests';
import SubscribeButton from '@/features/subscribeButton/SubscribeButton';
import UserData from '@/widgets/userData/userData';
import UserInfo from '@/widgets/userData/userInfo';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function UserPage() {
  const { id } = useParams();
  const [OpenUser, setOpenUser] = useState<OpenUserType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRequestObject('users/' + id)
      .then((user) => {
        setOpenUser(user);
      })
      .catch(() => toast.error('Пользователь не найден.'));
  }, [id]);

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
      <motion.div className={Styles.UserInformation} {...formContainer}>
        <UserData OpenUser={OpenUser} />
        {window.innerWidth >= 900 && <UserInfo OpenUser={OpenUser} />}
      </motion.div>
      <motion.div className={Styles.UserPosts}>
        <ShowPosts ShowTitle AuthorFilter={OpenUser.id} />
      </motion.div>
    </>
  );
}

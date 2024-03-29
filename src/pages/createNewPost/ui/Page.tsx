import { sendNewPost } from '../api/sendNewPost';
import CreatePostModals from './modals';
import Styles from './styles.module.scss';
import {
  Button,
  ButtonIcons,
  ButtonTypes,
  Select,
  SelectTypes,
  buttonIcons,
  formContainer,
  formItem,
} from '@/app/assets/Tempus-Ui';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { setExecuteButton } from '@/app/slices/header/headerSlice';
import { changeAuthorPost } from '@/app/slices/witePost/writePostSlice';
import getUserAdmins from '@/features/api/Teams/get-user-admins';
import AppRoutes from '@/shared/routes/app-routes';
import RenderBlocks from '@/widgets/renderBlocks';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const user = useAuth();
  const [selectBlockModalOpen, setSelectBlockModalOpen] = useState(false);
  const [userAdmins, setUserAdmins] = useState<{ value: string; label: string }[]>();
  const newPost = useAppSelector((state) => state.WritePost);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserAdmins(user.id).then((teams) => setUserAdmins(teams));
    handleSelectAuthor(user.id);
  }, []);

  useEffect(() => {
    dispatch(
      setExecuteButton({
        button: {
          component: (
            <Button Click={() => user.canChanging && sendNewPost(newPost, dispatch, navigate)} Type={ButtonTypes.icon}>
              <ButtonIcons Icon={buttonIcons.Sent} />
            </Button>
          ),
        },
      }),
    );
  }, [newPost]);

  const Authors = [{ label: 'От меня', value: user.id }, ...(userAdmins ? userAdmins : [])];

  const handleSelectAuthor = (authorId: string) => {
    dispatch(changeAuthorPost({ authorId }));
  };

  if (!user.canChanging) {
    return <Navigate to={AppRoutes.DEFAULT}></Navigate>;
  }
  return (
    <motion.div className={Styles.WritePost} {...formContainer}>
      <CreatePostModals
        selectBlockModalOpen={selectBlockModalOpen}
        setSelectBlockModalOpen={setSelectBlockModalOpen}
      ></CreatePostModals>
      <Select
        Type={SelectTypes.Input}
        Array={Authors}
        setSelect={handleSelectAuthor}
        Placeholder="От кого пост"
        DefaultValue={user.id}
      ></Select>
      <RenderBlocks blocksData={newPost.blocks}></RenderBlocks>
      <Button
        Variants={formItem}
        Title="Добавить блок"
        Type={ButtonTypes.default}
        Click={() => setSelectBlockModalOpen(true)}
      ></Button>
    </motion.div>
  );
};

export { CreatePostPage };

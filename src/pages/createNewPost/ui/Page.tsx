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
import { setExecuteButton } from '@/app/slices/header/header-slice';
import { changeAuthorPost } from '@/app/slices/wite-post/write-post-slice';
import getUserAdmins from '@/features/api/Teams/get-user-admins';
import AppRoutes from '@/shared/routes/app-routes';
import RenderBlocks from '@/widgets/renderBlocks';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const { UserId, UserCanChanging } = useAuth();
  const [selectBlockModalOpen, setSelectBlockModalOpen] = useState(false);
  const [userAdmins, setUserAdmins] = useState<{ value: string; label: string }[]>();
  const newPost = useAppSelector((state) => state.WritePost);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserAdmins(UserId).then((teams) => setUserAdmins(teams));
  }, []);

  useEffect(() => {
    dispatch(
      setExecuteButton({
        button: {
          component: (
            <Button Click={() => UserCanChanging && sendNewPost(newPost, dispatch, navigate)} Type={ButtonTypes.icon}>
              <ButtonIcons Icon={buttonIcons.Sent} />
            </Button>
          ),
        },
      }),
    );
  }, [newPost]);

  const Authors = userAdmins && [{ label: 'От меня', value: UserId }, ...userAdmins];

  const handleSelectAuthor = (authorId: string) => {
    dispatch(changeAuthorPost({ authorId }));
  };

  return UserCanChanging ? (
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
      ></Select>
      <RenderBlocks blocksData={newPost.blocks}></RenderBlocks>
      <Button
        Variants={formItem}
        Title="Добавить блок"
        Type={ButtonTypes.default}
        Click={() => setSelectBlockModalOpen(true)}
      ></Button>
    </motion.div>
  ) : (
    <Navigate to={AppRoutes.DEFAULT}></Navigate>
  );
};

export { CreatePostPage };

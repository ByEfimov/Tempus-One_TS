import RenderBlocks from '../../create-new/create-new-post/render-blocks';
import SelectBlockModal from '../../create-new/create-new-post/select-block-modal';
import { sendNewPost } from '../api/sendNewPost';
import Styles from './styles.module.scss';
import getUserAdmins from '@/Api/Teams/get-user-admins';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    Select,
    SelectTypes,
    buttonIcons,
    formContainer,
    formItem,
} from '@/Assets/Tempus-Ui';
import { useAppDispatch, useAppSelector } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import { setExecuteButton } from '@/Store/slices/header/header-slice';
import { changeAuthorPost } from '@/Store/slices/wite-post/write-post-slice';
import AppRoutes from '@/Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const { UserExperience, UserId, UserCanChanging } = useAuth();
    const [selectBlockModalOpen, setSelectBlockModalOpen] = useState(false);
    const [UserAdmins, setUserAdmins] =
        useState<{ value: string; label: string }[]>();
    const NewPost = useAppSelector((state) => state.WritePost);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUserAdmins(UserId).then((teams) => setUserAdmins(teams));

        dispatch(
            setExecuteButton({
                button: {
                    component: (
                        <Button
                            Click={() =>
                                sendNewPost(
                                    UserId,
                                    UserExperience,
                                    NewPost,
                                    dispatch,
                                    navigate,
                                )
                            }
                            Type={ButtonTypes.icon}
                        >
                            <ButtonIcons Icon={buttonIcons.Sent} />
                        </Button>
                    ),
                },
            }),
        );
    }, [NewPost]);

    return UserCanChanging ? (
        <>
            {selectBlockModalOpen && (
                <SelectBlockModal
                    setModalOpen={setSelectBlockModalOpen}
                ></SelectBlockModal>
            )}
            <motion.div className={Styles.WritePost} {...formContainer}>
                <Select
                    Type={SelectTypes.Input}
                    Array={
                        UserAdmins && [
                            ...UserAdmins,
                            { label: 'От меня', value: UserId },
                        ]
                    }
                    setSelect={(value: string) => {
                        dispatch(changeAuthorPost({ authorId: value }));
                    }}
                    Placeholder="От кого пост"
                ></Select>
                <RenderBlocks blocksData={NewPost.blocks}></RenderBlocks>
                <Button
                    Variants={formItem}
                    Title="Добавить блок"
                    Type={ButtonTypes.default}
                    Click={() => setSelectBlockModalOpen(true)}
                ></Button>
            </motion.div>
        </>
    ) : (
        <Navigate to={AppRoutes.DEFAULT}></Navigate>
    );
};

export { CreatePostPage };

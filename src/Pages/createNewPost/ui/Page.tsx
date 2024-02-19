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
    const [userAdmins, setUserAdmins] =
        useState<{ value: string; label: string }[]>();
    const newPost = useAppSelector((state) => state.WritePost);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getUserAdmins(UserId).then((teams) => setUserAdmins(teams));
    });

    useEffect(() => {
        dispatch(
            setExecuteButton({
                button: {
                    component: (
                        <Button
                            Click={() =>
                                sendNewPost(
                                    UserId,
                                    UserExperience,
                                    newPost,
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
    }, [newPost]);

    return UserCanChanging ? (
        <motion.div className={Styles.WritePost} {...formContainer}>
            <CreatePostModals
                selectBlockModalOpen={selectBlockModalOpen}
                setSelectBlockModalOpen={setSelectBlockModalOpen}
            ></CreatePostModals>
            <Select
                Type={SelectTypes.Input}
                Array={
                    userAdmins && [
                        { label: 'От меня', value: UserId },
                        ...userAdmins,
                    ]
                }
                setSelect={(value: string) => {
                    dispatch(changeAuthorPost({ authorId: value }));
                }}
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

interface CreatePostModalsProps {
    selectBlockModalOpen: boolean;
    setSelectBlockModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModals({
    selectBlockModalOpen,
    setSelectBlockModalOpen,
}: CreatePostModalsProps) {
    return (
        selectBlockModalOpen && (
            <SelectBlockModal
                setModalOpen={setSelectBlockModalOpen}
            ></SelectBlockModal>
        )
    );
}

export { CreatePostPage };

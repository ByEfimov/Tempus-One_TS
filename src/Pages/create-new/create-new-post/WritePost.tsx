import Styles from './Styles.module.scss';
import RenderBlocks from './render-blocks';
import SelectBlockModal from './select-block-modal';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    Select,
    SelectTypes,
    buttonIcons,
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui';
import { useAppDispatch, useAppSelector } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { changeAuthorPost } from 'Store/slices/wite-post/write-post-slice';
import AppRoutes from 'Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const WritePost = () => {
    const { UserExperience, UserId, UserCanChanging } = useAuth();
    const [selectBlockModalOpen, setSelectBlockModalOpen] = useState(false);
    const NewPost = useAppSelector((state) => state.WritePost);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        function sendNewPost() {
            changeRequest(
                'users/' + UserId,
                '/experience',
                UserExperience + 40,
            );
            postRequestWithNewId('posts/', '');
            navigate(AppRoutes.DEFAULT);
        }
        dispatch(
            setExecuteButton({
                button: {
                    component: (
                        <Button Click={sendNewPost} Type={ButtonTypes.icon}>
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
            <motion.div
                className={Styles.WritePost}
                variants={formContainer}
                initial="hidden"
                animate="visible"
            >
                <Select
                    Type={SelectTypes.Input}
                    Array={[{ label: 'От меня', value: UserId }]}
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

export default WritePost;

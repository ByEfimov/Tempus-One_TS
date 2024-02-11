import Styles from './Styles.module.scss';
import RenderBlocks from './render-blocks';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
} from 'Assets/Tempus-Ui';
import { useAppDispatch, useAppSelector } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import AppRoutes from 'Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const WritePost = () => {
    const { UserExperience, UserId, UserCanChanging } = useAuth();
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
        <motion.div className={Styles.WritePost}>
            <RenderBlocks blocksData={NewPost.blocks}></RenderBlocks>
            <Button
                Title="Добавить блок"
                Type={ButtonTypes.default}
                Click={() => {}}
            ></Button>
        </motion.div>
    ) : (
        <Navigate to={AppRoutes.DEFAULT}></Navigate>
    );
};

export default WritePost;

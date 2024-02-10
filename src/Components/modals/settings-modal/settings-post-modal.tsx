import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import { removeRequest } from 'Api/requests/remove-request';
import {
    Button,
    ButtonTypes,
    Input,
    InputColors,
    InputTypes,
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui';
import { Post } from 'Types/TypesOfData/post/post';
import AppRoutes from 'Utils/routes/app-routes';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsPostModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
    postid: string | undefined;
}

const SettingsPostModal: FC<SettingsPostModal> = ({
    setModalOpen,
    post,
    postid,
}) => {
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');

    const navigate = useNavigate();

    function ChangeFunction() {
        if (postTitle !== '') {
            changeRequest('posts/' + postid, '/PostTitle', postTitle);
        }
        if (postText !== '') {
            changeRequest(
                'posts/' + postid,
                '/PostDataBlocks/0/text',
                postText,
            );
        }
        navigate(AppRoutes.POST + '/' + postid);
        CloseModal();
    }

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={formContainer}
                className={Styles.SettingsModal}
            >
                <Input
                    Variants={formItem}
                    Placeholder="Заголовок"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setPostTitle(e.currentTarget.value);
                    }}
                    Value={postTitle}
                    Type={InputTypes.text}
                ></Input>
                <Input
                    Variants={formItem}
                    Placeholder="Основной текст"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setPostText(e.currentTarget.value);
                    }}
                    Value={postText}
                    Type={InputTypes.text}
                ></Input>
                <Button
                    Variants={formItem}
                    Title="Применить"
                    Click={ChangeFunction}
                    Type={ButtonTypes.active}
                ></Button>
                <Button
                    Variants={formItem}
                    Title="Удалить пост"
                    Click={() => {
                        removeRequest('posts/', post.id);
                        navigate(AppRoutes.DEFAULT);
                        CloseModal();
                    }}
                    Type={ButtonTypes.error}
                ></Button>
            </motion.div>
        </IsModal>
    );
};

export default SettingsPostModal;

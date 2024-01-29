import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import { removeRequest } from 'Api/requests/remove-request';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import Input, {
    InputColors,
    InputTypes,
} from 'Assets/Tempus-Ui/Components/Inputs/Input';
import { Post } from 'Types/TypesOfData/post/post';
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
        navigate('/');
        CloseModal();
    }

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div className={Styles.SettingsModal}>
                <Input
                    Placeholder="Заголовок"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setPostTitle(e.currentTarget.value);
                    }}
                    Value={postTitle}
                    Type={InputTypes.text}
                ></Input>
                <Input
                    Placeholder="Основной текст"
                    Color={InputColors.primary}
                    Change={(e) => {
                        setPostText(e.currentTarget.value);
                    }}
                    Value={postText}
                    Type={InputTypes.text}
                ></Input>
                <Button
                    Title="Применить"
                    Click={ChangeFunction}
                    Type={ButtonTypes.active}
                ></Button>
                <Button
                    Title="Удалить пост"
                    Click={() => {
                        removeRequest('posts/', post.id);
                        navigate('/');
                        CloseModal();
                    }}
                    Type={ButtonTypes.error}
                ></Button>
            </motion.div>
        </IsModal>
    );
};

export default SettingsPostModal;

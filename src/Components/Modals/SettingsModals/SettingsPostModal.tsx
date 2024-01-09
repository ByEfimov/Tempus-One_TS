import Styles from '../Modal.module.scss';
import { CloseModal, IsModal } from '../isModal';
import changePostData from 'Api/Posts/ChangePostData';
import removePost from 'Api/Posts/removePost';
import ButtonVoid from 'Components/MiniComponents/button';
import CustomInput from 'Components/MiniComponents/input';
import CustomTextarea from 'Components/MiniComponents/textarea';
import { Post } from 'Types/TypesOfData/Post/Post';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsPostModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
}

const SettingsPostModal: FC<SettingsPostModal> = ({ setModalOpen, post }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');

    const navigate = useNavigate();

    function ChangeFunction() {
        if (postTitle !== '') {
            changePostData('PostTitle', postTitle, post.PostId);
        }
        if (postText !== '') {
            changePostData('PostDataBlocks/0/text', postText, post.PostId);
        }
        navigate('/');
        CloseModal();
    }

    return (
        <IsModal title="Настройки" setModalOpen={setModalOpen}>
            <CustomInput
                placeholder="Заголовок"
                mode="large"
                changeFunction={(e) => {
                    setPostTitle(e.currentTarget.value);
                }}
            ></CustomInput>
            <CustomTextarea
                placeholder="Основной текст"
                mode="large"
                changeFunction={(e) => {
                    setPostText(e.currentTarget.value);
                }}
            ></CustomTextarea>
            <ButtonVoid
                clickHandler={ChangeFunction}
                title="Применить"
                classes={Styles.ButtonModal}
                padding={false}
            ></ButtonVoid>
            <ButtonVoid
                clickHandler={() => {
                    removePost(post.PostId);
                    navigate('/');
                    CloseModal();
                }}
                title="Удалить пост"
                classes={Styles.ButtonModalFalse}
                padding={false}
            ></ButtonVoid>
        </IsModal>
    );
};

export default SettingsPostModal;

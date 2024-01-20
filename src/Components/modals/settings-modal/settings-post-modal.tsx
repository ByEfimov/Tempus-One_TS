import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import changePostData from 'Api/Posts/change-post-data';
import removePost from 'Api/Posts/remove-post';
import ButtonVoid from 'Components/mini-components/button';
import CustomInput from 'Components/mini-components/input';
import CustomTextarea from 'Components/mini-components/textarea';
import { Post } from 'Types/TypesOfData/post/post';
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

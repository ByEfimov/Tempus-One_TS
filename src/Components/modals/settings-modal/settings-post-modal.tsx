import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import { removeRequest } from 'Api/requests/remove-request';
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
            changeRequest('posts/' + post.id, '/PostTitle', postTitle);
        }
        if (postText !== '') {
            changeRequest(
                'posts/' + post.id,
                '/PostDataBlocks/0/text',
                postText,
            );
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
                    removeRequest('posts/', post.id);
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

import { CloseModal, IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import getUserAdmins from 'Api/Teams/get-user-admins';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import {
    defaultContainer,
    defaultItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import ShowLogo from 'Components/mini-components/show-logo';
import {
    ErrorNotification,
    MassageNotification,
} from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { NewPostType } from 'Types/TypesOfData/post/new-post-type';
import { Post } from 'Types/TypesOfData/post/post';
import AppRoutes from 'Utils/routes/app-routes';
import { countEmptyValues } from 'Utils/validate-data/count-empty-values';
import { getUnixTime } from 'date-fns';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RepostModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
}

const RepostModal: FC<RepostModal> = ({ setModalOpen, post }) => {
    const { UserPhoto, UserId, UserIsAuth, UserSubscriptions } = useAuth();
    const [teamsAdmin, setTeamsAdmin] = useState<
        { TeamId: string; TeamName: string; TeamImage: string }[] | undefined
    >();
    const navigate = useNavigate();

    useEffect(() => {
        if (UserSubscriptions?.teams) {
            getUserAdmins(UserId).then((teams) => setTeamsAdmin(teams));
        }
    }, []);

    function repostToYou() {
        const currentDate = new Date();
        const currentUnixTime = getUnixTime(currentDate);

        const NewPost: NewPostType = {
            ...post,
            PostAuthorId: UserId,
            PostId: null,
            PostDate: currentUnixTime,
            PostWithRepostUs: post.id,
            id: null,
        };

        if (countEmptyValues(NewPost) - 5 >= 0 && UserIsAuth) {
            postRequestWithNewId('posts/', NewPost);

            changeRequest(
                'posts/' + post.id,
                '/PostReposts/',
                post.PostReposts + 1,
            );
            navigate(AppRoutes.USER + '/' + UserId);
            MassageNotification('Пост отправлен!');
        } else {
            if (!UserIsAuth) {
                ErrorNotification('Нужно войти в аккаунт.');
            }
            ErrorNotification('Ошибка при отправке поста.');
        }
        CloseModal();
    }

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={defaultContainer}
                className={Styles.RepostModal}
            >
                <motion.button
                    variants={defaultItem}
                    onClick={repostToYou}
                    className={Styles.RepostToYou}
                >
                    <ShowLogo ImageUrl={UserPhoto}></ShowLogo>
                    <p className={Styles.name}>Себе</p>
                </motion.button>
                {teamsAdmin &&
                    teamsAdmin.map((team) => (
                        <motion.button
                            variants={defaultItem}
                            key={team.TeamId}
                            onClick={repostToYou}
                            className={Styles.RepostToTeam}
                        >
                            <ShowLogo ImageUrl={team.TeamImage}></ShowLogo>
                            <p className={Styles.name}>{team.TeamName}</p>
                        </motion.button>
                    ))}
            </motion.div>
        </IsModal>
    );
};

export default RepostModal;

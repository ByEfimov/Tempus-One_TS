import Styles from '../posts/Styles.module.scss';
import { WhoWrotePost } from '../posts/post-render';
import { formItem } from '@/Assets/Tempus-Ui';
import UserLogo from '@/Components/header/user-logo';
import SubscribeButton from '@/Components/mini-components/subscribe-button';
import { PostType } from '@/Store/slices/wite-post/write-post-slice';
import formatTimeAgo from '@/Utils/post-utils/format-time-ago';
import ItsUser from '@/Utils/users-or-teams/Its-user';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthorDataRenderProps {
    post: PostType;
    WhoWrotePost?: WhoWrotePost;
}

const AuthorDataRender: FC<AuthorDataRenderProps> = ({
    post,
    WhoWrotePost,
}) => {
    const navigate = useNavigate();

    return (
        <motion.div
            variants={formItem}
            className={Styles.AuthorData}
            onClick={(e) => {
                e.stopPropagation();
                navigate(
                    (ItsUser(WhoWrotePost?.id) &&
                        '/User/' + WhoWrotePost?.id) ||
                        '/Team/' + WhoWrotePost?.id,
                );
            }}
        >
            <div className={Styles.Data}>
                <div className={Styles.Photo}>
                    <UserLogo
                        Logo={WhoWrotePost?.image || WhoWrotePost?.photo}
                    ></UserLogo>
                </div>
                <div className={Styles.Text}>
                    <div className={Styles.Name}>
                        {WhoWrotePost?.name || WhoWrotePost?.title}
                    </div>
                    <div className={Styles.Date}>
                        {formatTimeAgo(post.date)}
                    </div>
                </div>
            </div>

            <SubscribeButton
                WhoWrotePost={WhoWrotePost}
                id={WhoWrotePost?.id}
            ></SubscribeButton>
        </motion.div>
    );
};

export default AuthorDataRender;

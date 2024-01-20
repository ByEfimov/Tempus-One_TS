import Styles from '../posts/Styles.module.scss';
import { WhoWrotePost } from '../posts/post-render';
import ShowLogo from 'Components/mini-components/show-logo';
import SubscribeButton from 'Components/mini-components/subscribe-button';
import { Post } from 'Types/TypesOfData/post/post';
import formatTimeAgo from 'Utils/post-utils/format-time-ago';
import ItsUser from 'Utils/users-or-teams/Its-user';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthorDataRenderProps {
    post: Post;
    WhoWrotePost: WhoWrotePost | null;
}

const AuthorDataRender: FC<AuthorDataRenderProps> = ({
    post,
    WhoWrotePost,
}) => {
    const navigate = useNavigate();

    return (
        <div
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
                    <ShowLogo
                        ImageUrl={WhoWrotePost?.image || WhoWrotePost?.photo}
                    ></ShowLogo>
                </div>
                <div className={Styles.Text}>
                    <div className={Styles.Name}>
                        {WhoWrotePost?.name || WhoWrotePost?.title}
                    </div>
                    <div className={Styles.Date}>
                        {formatTimeAgo(post.PostDate)}
                    </div>
                </div>
            </div>

            <SubscribeButton WhoWrotePost={WhoWrotePost}></SubscribeButton>
        </div>
    );
};

export default AuthorDataRender;

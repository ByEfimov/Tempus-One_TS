import { WhoWrotePost } from '../Posts/PostRender';
import Styles from '../Posts/Styles.module.scss';
import ShowLogo from 'Components/MiniComponents/ShowLogo';
import SubscribeButton from 'Components/MiniComponents/SubscribeButton';
import { Post } from 'Types/TypesOfData/Post/Post';
import formatTimeAgo from 'Utils/Posts/FormatTimeAgo';
import ItsUser from 'Utils/UsersOrTeams/ItsUser';
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

import { Post } from 'Types/TypesOfData/Post/Post';
import Styles from '../Posts/Styles.module.scss';
import HeartIcon from 'Assets/Icons/Post/heart.svg';
import CommentIcon from 'Assets/Icons/Post/comment.svg';
import ShareIcon from 'Assets/Icons/Post/share.svg';
import EyeIcon from 'Assets/Icons/Post/eye.svg';
import { FC } from 'react';

interface ActivitiesProps {
    post: Post;
}

const Activities: FC<ActivitiesProps> = ({ post }) => {
    return (
        <div className={Styles.PostActivity}>
            <div className={Styles.Buttons}>
                <button>
                    <img src={HeartIcon} alt="" />
                    <h1>{post.PostLikes}</h1>
                </button>
                <button>
                    <img src={CommentIcon} alt="" />
                    <h1>{post.PostComments?.length || 0}</h1>
                </button>
                <button>
                    <img src={ShareIcon} alt="" />
                    <h1>{post.PostReposts}</h1>
                </button>
            </div>
            <button className={Styles.Shows}>
                <img src={EyeIcon} alt="" />
                <h1> {post.PostShows}</h1>
            </button>
        </div>
    );
};
export default Activities;

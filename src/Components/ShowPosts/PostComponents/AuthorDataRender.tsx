import { FC } from 'react';
import Styles from '../Posts/Styles.module.scss';
import UserIcon from 'Assets/Icons/Header/user.svg';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import { Post } from 'Types/TypesOfData/Post/Post';
import { WhoWrotePost } from '../Posts/PostRender';
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
                navigate('/User/' + WhoWrotePost?.id);
            }}
        >
            <div className={Styles.Data}>
                <div className={Styles.Photo}>
                    <img
                        src={
                            WhoWrotePost?.image ||
                            WhoWrotePost?.photo ||
                            UserIcon
                        }
                        alt=""
                    />
                </div>
                <div className={Styles.Text}>
                    <div className={Styles.Name}>
                        {WhoWrotePost?.name || WhoWrotePost?.title}
                    </div>
                    <div className={Styles.Date}>{post.PostDate}</div>
                </div>
            </div>
            <button className={Styles.ActiveButton}>
                <img src={PlusIcon} alt="" />
            </button>
        </div>
    );
};

export default AuthorDataRender;

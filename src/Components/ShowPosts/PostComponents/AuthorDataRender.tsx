import { FC } from 'react';
import Styles from '../Posts/Styles.module.scss';
import PlusIcon from 'Assets/Icons/Post/plus-circle.svg';
import { Post } from 'Types/TypesOfData/Post/Post';
import { WhoWrotePost } from '../Posts/PostRender';
import { useNavigate } from 'react-router-dom';
import ShowLogo from 'Components/MiniComponents/ShowLogo';
import ItsUser from 'Utils/UsersOrTeams/ItsUser';

interface AuthorDataRenderProps {
    post: Post;
    WhoWrotePost: WhoWrotePost | null;
}

const AuthorDataRender: FC<AuthorDataRenderProps> = ({
    post,
    WhoWrotePost,
}) => {
    const navigate = useNavigate();
    ItsUser(WhoWrotePost?.id);
    return (
        <div
            className={Styles.AuthorData}
            onClick={(e) => {
                e.stopPropagation();
                navigate(
                    (ItsUser(WhoWrotePost?.id) &&
                        '/User/' + WhoWrotePost?.id) ||
                        '/Team/' + WhoWrotePost?.id
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

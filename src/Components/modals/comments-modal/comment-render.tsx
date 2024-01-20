import { CloseModal } from '../is-modal';
import Styles from '../style.module.scss';
import { getUserFromId } from 'Api/Users/get-data/get-user-data-from-id';
import FakeComment from 'Components/fake-data/fake-comment';
import ShowLogo from 'Components/mini-components/show-logo';
import { Comments } from 'Types/TypesOfData/post/comments';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import formatTimeAgo from 'Utils/post-utils/format-time-ago';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface comment {
    comment: Comments;
}

const CommentRender: FC<comment> = ({ comment }) => {
    const [commentator, setCommentator] = useState<OpenUserType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserFromId(comment.CommentatorId).then((user) =>
            setCommentator(user),
        );
    }, []);

    if (commentator) {
        return (
            <div className={Styles.comment}>
                <div
                    className={Styles.author}
                    onClick={() => {
                        navigate('/User/' + commentator.id);
                        CloseModal();
                    }}
                >
                    <div className={Styles.Photo}>
                        <ShowLogo ImageUrl={commentator.photo}></ShowLogo>
                    </div>
                    <div className={Styles.Data}>
                        {commentator.name} {commentator.level}
                        <div className={Styles.commentText}>
                            {comment.CommentText}
                        </div>
                        <div className={Styles.date}>
                            {formatTimeAgo(comment.CommentDate)}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <FakeComment></FakeComment>;
    }
};

export default CommentRender;

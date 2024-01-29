import { CloseModal } from '../is-modal';
import Styles from '../style.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import FakeComment from 'Components/fake-data/fake-comment';
import ShowLogo from 'Components/mini-components/show-logo';
import { Comments } from 'Types/TypesOfData/post/comments';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import formatTimeAgo from 'Utils/post-utils/format-time-ago';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface comment {
    comment: Comments;
}

const CommentRender: FC<comment> = ({ comment }) => {
    const [commentator, setCommentator] = useState<OpenUserType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRequestObject('users/' + comment.CommentatorId).then((user) =>
            setCommentator(user),
        );
    }, []);

    if (commentator) {
        return (
            <motion.div className={Styles.comment}>
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
                        <div className={Styles.top}>
                            {commentator.name} {commentator.level}
                            <div className={Styles.date}>
                                {formatTimeAgo(comment.CommentDate)}
                            </div>
                        </div>
                        <div className={Styles.commentText}>
                            {comment.CommentText}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    } else {
        return <FakeComment></FakeComment>;
    }
};

export default CommentRender;
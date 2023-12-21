import { FC, useEffect, useState } from 'react';
import Styles from '../Modal.module.scss';
import { getUserFromId } from 'Api/Users/getUserDataFromId';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import { Comments } from 'Types/TypesOfData/Post/Comments';
import UserIcon from 'Assets/Icons/Header/user.svg';

interface comment {
    comment: Comments;
}

const CommentRender: FC<comment> = ({ comment }) => {
    const [commentator, setCommentator] = useState<OpenUserType | null>(null);

    useEffect(() => {
        getUserFromId(comment.CommentatorId).then((user) =>
            setCommentator(user)
        );
    }, []);

    if (commentator) {
        return (
            <div className={Styles.comment}>
                <div className={Styles.author}>
                    <div className={Styles.Photo}>
                        <img src={commentator.photo || UserIcon} alt="" />
                    </div>
                    <div className={Styles.Data}>
                        {commentator.name} {commentator.level}
                        <div className={Styles.commentText}>
                            {comment.CommentText}
                        </div>
                        <div className={Styles.date}>{comment.CommentDate}</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CommentRender;

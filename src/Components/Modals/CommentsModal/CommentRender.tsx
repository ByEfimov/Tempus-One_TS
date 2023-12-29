import { FC, useEffect, useState } from 'react';
import Styles from '../Modal.module.scss';
import { getUserFromId } from 'Api/Users/getUserDataFromId';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import { Comments } from 'Types/TypesOfData/Post/Comments';
import ShowLogo from 'Components/MiniComponents/ShowLogo';
import FakeComment from 'Components/FakeData/FakeComment';
import { useNavigate } from 'react-router-dom';
import { CloseModal } from '../isModal';

interface comment {
    comment: Comments;
}

const CommentRender: FC<comment> = ({ comment }) => {
    const [commentator, setCommentator] = useState<OpenUserType | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserFromId(comment.CommentatorId).then((user) =>
            setCommentator(user)
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
                        <div className={Styles.date}>{comment.CommentDate}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <FakeComment></FakeComment>;
    }
};

export default CommentRender;

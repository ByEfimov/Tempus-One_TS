import { IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import CommentRender from './comment-render';
import { getRequestArray } from 'Api/requests/get-requests';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import SendIcon from 'Assets/Icons/Post/message.svg';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { Comments } from 'Types/TypesOfData/post/comments';
import filterBadWords from 'Utils/post-utils/filter-bad-words';
import { getUnixTime } from 'date-fns';
import { FC, useEffect, useState } from 'react';

interface CommentsModalProps {
    PostId: string;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsModal: FC<CommentsModalProps> = ({ setModalOpen, PostId }) => {
    const { UserId, UserIsAuth } = useAuth();
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState<Comments[] | string>(
        'Комментариев еще нет.',
    );

    function getCommentsOfPost() {
        getRequestArray('posts/' + PostId + '/PostComments/')
            .then((comments) => setComments(comments))
            .catch(() => setComments('Комментариев еще нет.'));
    }

    useEffect(() => {
        getCommentsOfPost();
    }, []);

    const sendComment = () => {
        const currentDate = new Date();
        const currentUnixTime = getUnixTime(currentDate);
        const commentText = filterBadWords(commentInput);
        const commentPath = 'posts/' + PostId + '/PostComments/';
        if (commentInput && UserIsAuth) {
            const NewComment = {
                CommentatorId: UserId,
                CommentText: commentText,
                CommentDate: currentUnixTime,
            };
            postRequestWithNewId(commentPath, NewComment);
            getCommentsOfPost();
            setCommentInput('');
        } else if (!UserIsAuth) {
            ErrorNotification('Нужно войти в аккаунт.');
        }
    };

    return (
        <IsModal title={'Комментарии'} setModalOpen={setModalOpen}>
            <div className={Styles.Comments}>
                {Array.isArray(comments) &&
                    comments.map((comment) => (
                        <CommentRender key={comment.id} comment={comment} />
                    ))}
            </div>

            <div className={Styles.Input}>
                <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Новый комментарий"
                />
                <button onClick={() => sendComment()}>
                    <img src={SendIcon} alt="" />
                </button>
            </div>
        </IsModal>
    );
};
export default CommentsModal;

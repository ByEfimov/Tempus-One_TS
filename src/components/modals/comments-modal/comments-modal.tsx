import { IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import CommentRender from './comment-render';
import { addNewComment } from 'Api/Posts/Activities/add-new-comment';
import { getComments } from 'Api/Posts/Activities/get-comments';
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
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comments[] | string>(
        'Комментариев еще нет.',
    );

    function getCommentsThis() {
        getComments(PostId)
            .then((comments) => setComments(comments))
            .catch(() => setComments('Комментариев еще нет.'));
    }

    useEffect(() => {
        getCommentsThis();
    }, []);

    const sendComment = () => {
        const currentDate = new Date();
        const currentUnixTime = getUnixTime(currentDate);
        const Text = filterBadWords(commentText);
        if (commentText && UserIsAuth) {
            const NewComment = {
                CommentatorId: UserId,
                CommentText: Text,
                CommentDate: currentUnixTime,
            };
            addNewComment(NewComment, PostId);
            getCommentsThis();
            setCommentText('');
        } else if (!UserIsAuth) {
            ErrorNotification('Нужно войти в аккаунт.');
        }
    };

    return (
        <IsModal title={'Комментарии'} setModalOpen={setModalOpen}>
            <div className={Styles.Comments}>
                {Array.isArray(comments) &&
                    comments.map((comment) => (
                        <CommentRender
                            key={comment.CommentId}
                            comment={comment}
                        />
                    ))}
            </div>

            <div className={Styles.Input}>
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
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
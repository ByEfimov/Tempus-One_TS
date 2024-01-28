import { IsModal } from '../is-modal';
import Styles from '../style.module.scss';
import CommentRender from './comment-render';
import { getRequestArray } from 'Api/requests/get-requests';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import SendIcon from 'Assets/Icons/Post/message.svg';
import Input, {
    InputColors,
    InputTypes,
} from 'Assets/Tempus-Ui/Components/Inputs/Input';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import { Comments } from 'Types/TypesOfData/post/comments';
import filterBadWords from 'Utils/post-utils/filter-bad-words';
import { getUnixTime } from 'date-fns';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

interface CommentsModalProps {
    PostId: string;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsModal: FC<CommentsModalProps> = ({ setModalOpen, PostId }) => {
    const { UserId, UserIsAuth } = useAuth();
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState<Comments[]>();

    function getCommentsOfPost() {
        getRequestArray('posts/' + PostId + '/PostComments/').then((comments) =>
            setComments(comments),
        );
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
        <IsModal setModalOpen={setModalOpen}>
            <div className={Styles.Comments}>
                <div className={Styles.Wrapper}>
                    {comments ? (
                        comments.map((comment) => (
                            <CommentRender key={comment.id} comment={comment} />
                        ))
                    ) : (
                        <Preloader></Preloader>
                    )}
                </div>
            </div>

            <motion.div className={Styles.Input}>
                <Input
                    Placeholder="Новый комментарий"
                    Change={(e) => setCommentInput(e.target.value)}
                    Value={commentInput}
                    Type={InputTypes.text}
                    Color={InputColors.primary}
                ></Input>
                <button onClick={() => sendComment()}>
                    <img src={SendIcon} alt="" />
                </button>
            </motion.div>
        </IsModal>
    );
};
export default CommentsModal;

import { IsModal } from '../../shared/isModal';
import Styles from '../style.module.scss';
import CommentRender from './commentRender';
import SendIcon from '@/Assets/Icons/Post/message.svg';
import { getRequestArray } from '@/app/api/requests/get-requests';
import { postRequestWithNewId } from '@/app/api/requests/post-requests-with-new-id';
import { Input, InputColors, InputTypes, Preloader } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { Comments } from '@/app/types/TypesOfData/post/comments';
import { ErrorNotification } from '@/features/notifications/notifications';
import filterBadWords from '@/shared/post-utils/filter-bad-words';
import { getUnixTime } from 'date-fns';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

interface CommentsModalProps {
  PostId: string | undefined;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsModal: FC<CommentsModalProps> = ({ setModalOpen, PostId }) => {
  const { UserId, UserIsAuth } = useAuth();
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<Comments[]>();

  function getCommentsOfPost() {
    getRequestArray('posts/' + PostId + '/comments/').then((comments) => setComments(comments));
  }

  useEffect(() => {
    getCommentsOfPost();
  }, []);

  const sendComment = () => {
    const currentDate = new Date();
    const currentUnixTime = getUnixTime(currentDate);
    const commentText = filterBadWords(commentInput);
    const commentPath = 'posts/' + PostId + '/comments/';
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
            comments.map((comment) => <CommentRender key={comment.id} comment={comment} />)
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

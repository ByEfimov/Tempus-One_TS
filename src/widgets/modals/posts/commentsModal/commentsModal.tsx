import CommentRender from './commentRender';
import Styles from './styles.module.scss';
import SendIcon from '@/app/assets/Icons/Post/message.svg';
import { Button, ButtonTypes, Input, InputColors, InputTypes, Preloader } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { Comments } from '@/app/types/TypesOfData/post/comments';
import { getRequestArray } from '@/features/api/requests/get-requests';
import { postRequestWithNewId } from '@/features/api/requests/post-requests-with-new-id';
import { IsModal } from '@/shared/modals/isModal';
import { NOTIFI_TEXTS } from '@/shared/notifyTexts/notifyTexts';
import filterBadWords from '@/shared/post-utils/filter-bad-words';
import { getUnixTime } from 'date-fns';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CommentsModalProps {
  PostId: string | undefined;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CURRENT_DATE = new Date();
const CURRENT_UNIX_TIME = getUnixTime(CURRENT_DATE);

const CommentsModal: FC<CommentsModalProps> = ({ setModalOpen, PostId }) => {
  const user = useAuth();
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<Comments[]>();

  function getCommentsOfPost() {
    getRequestArray('posts/' + PostId + '/comments/').then((comments) => setComments(comments));
  }

  useEffect(() => {
    getCommentsOfPost();
  }, []);

  const sendComment = () => {
    const commentText = filterBadWords(commentInput);
    const commentPath = 'posts/' + PostId + '/comments/';
    if (commentInput && user.isAuth) {
      const NewComment = {
        CommentatorId: user.id,
        CommentText: commentText,
        CommentDate: CURRENT_UNIX_TIME,
      };
      postRequestWithNewId(commentPath, NewComment);
      getCommentsOfPost();
      setCommentInput('');
    } else if (!user.isAuth) {
      toast.error(NOTIFI_TEXTS.ERROR_NOT_AUTH);
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

        <Button Type={ButtonTypes.icon} Click={sendComment} Class={Styles.buttonSend}>
          <img src={SendIcon} alt="" />
        </Button>
      </motion.div>
    </IsModal>
  );
};
export default CommentsModal;

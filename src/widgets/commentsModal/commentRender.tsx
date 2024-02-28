import { CloseModal } from '../../shared/isModal';
import Styles from './styles.module.scss';
import { Comments } from '@/app/types/TypesOfData/post/comments';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import { getRequestObject } from '@/features/api/requests/get-requests';
import formatTimeAgo from '@/shared/post-utils/format-time-ago';
import AppRoutes from '@/shared/routes/app-routes';
import UserLogo from '@/shared/userLogo/userLogo';
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
    getRequestObject('users/' + comment.CommentatorId).then((user) => setCommentator(user));
  }, []);

  return (
    commentator && (
      <motion.div className={Styles.comment}>
        <div
          className={Styles.author}
          onClick={() => {
            navigate(AppRoutes.USER + '/' + commentator.id);
            CloseModal();
          }}
        >
          <div className={Styles.Photo}>
            <UserLogo Logo={commentator.photo}></UserLogo>
          </div>
          <div className={Styles.Data}>
            <div className={Styles.top}>
              {commentator.name} {commentator.level}
              <div className={Styles.date}>{formatTimeAgo(comment.CommentDate)}</div>
            </div>
            <div className={Styles.commentText}>{comment.CommentText}</div>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default CommentRender;

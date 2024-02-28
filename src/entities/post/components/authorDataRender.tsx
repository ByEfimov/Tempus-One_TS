import { WhoWrotePost } from '../postRender';
import Styles from '../styles.module.scss';
import { formItem } from '@/app/assets/Tempus-Ui';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import SubscribeButton from '@/features/subscribeButton/SubscribeButton';
import formatTimeAgo from '@/shared/post-utils/format-time-ago';
import UserLogo from '@/shared/userLogo/userLogo';
import ItsUser from '@/shared/users-or-teams/Its-user';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthorDataRenderProps {
  post: PostType;
  WhoWrotePost?: WhoWrotePost;
}

const AuthorDataRender: FC<AuthorDataRenderProps> = ({ post, WhoWrotePost }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={formItem}
      className={Styles.AuthorData}
      onClick={(e) => {
        e.stopPropagation();
        navigate((ItsUser(WhoWrotePost?.id) && '/User/' + WhoWrotePost?.id) || '/Team/' + WhoWrotePost?.id);
      }}
    >
      <div className={Styles.Data}>
        <div className={Styles.Photo}>
          <UserLogo Logo={WhoWrotePost?.image || WhoWrotePost?.photo} />
        </div>
        <div className={Styles.Text}>
          <div className={Styles.Name}>{WhoWrotePost?.name || WhoWrotePost?.title}</div>
          <div className={Styles.Date}>{formatTimeAgo(post.date)}</div>
        </div>
      </div>

      <SubscribeButton WhoWrotePost={WhoWrotePost} id={WhoWrotePost?.id}></SubscribeButton>
    </motion.div>
  );
};

export default AuthorDataRender;

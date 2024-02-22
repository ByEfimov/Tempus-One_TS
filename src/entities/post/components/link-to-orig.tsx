import Styles from '../styles.module.scss';
import { useNavigate } from 'react-router-dom';

const LinkToOrig = ({ post }: { post: PostType }) => {
  const navigate = useNavigate();
  return (
    post.PostWithRepostUs && (
      <a
        className={Styles.repost}
        onClick={(e) => {
          e.stopPropagation();
          navigate(AppRoutes.POST + '/' + post.PostWithRepostUs);
        }}
      >
        Ссылка на оригинал.
      </a>
    )
  );
};

export default LinkToOrig;

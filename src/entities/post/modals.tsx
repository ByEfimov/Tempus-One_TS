import { PostType } from '@/app/slices/witePost/writePostSlice';
import CommentsModal from '@/widgets/modals/posts/commentsModal/commentsModal';
import RepostModal from '@/widgets/modals/posts/repostModal/modal';

const PostModals = ({
  CommentsOpen,
  post,
  setCommentsOpen,
  RepostModalOpen,
  setRepostModalOpen,
}: {
  CommentsOpen: boolean;
  post: PostType;
  setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  RepostModalOpen: boolean;
  setRepostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {CommentsOpen && <CommentsModal PostId={post.id} setModalOpen={setCommentsOpen}></CommentsModal>}
      {RepostModalOpen && <RepostModal post={post} setModalOpen={setRepostModalOpen}></RepostModal>}
    </>
  );
};

export default PostModals;

import { PostType } from '@/app/slices/wite-post/write-post-slice';
import CommentsModal from '@/widgets/commentsModal/commentsModal';
import RepostModal from '@/widgets/repostModal/modal';

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

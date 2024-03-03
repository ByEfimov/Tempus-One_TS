import { PostType } from '@/app/slices/witePost/writePostSlice';
import CommentsModal from '@/widgets/modals/posts/commentsModal/commentsModal';
import RepostModal from '@/widgets/modals/posts/repostModal/modal';

interface modalInterface {
  setRepostsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  OpenPost: PostType;
  setCommentsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentsModalOpen: boolean;
  repostsModalOpen: boolean;
}

export function PostModals({
  commentsModalOpen,
  OpenPost,
  setCommentsModalOpen,
  repostsModalOpen,
  setRepostsModalOpen,
}: modalInterface) {
  return (
    <>
      {commentsModalOpen && <CommentsModal PostId={OpenPost.id} setModalOpen={setCommentsModalOpen}></CommentsModal>}
      {repostsModalOpen && <RepostModal post={OpenPost} setModalOpen={setRepostsModalOpen}></RepostModal>}
    </>
  );
}

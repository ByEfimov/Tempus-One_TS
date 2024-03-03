import SelectBlockModal from '@/widgets/modals/posts/selectBlockModal/modal';

interface CreatePostModalsProps {
  selectBlockModalOpen: boolean;
  setSelectBlockModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModals({ selectBlockModalOpen, setSelectBlockModalOpen }: CreatePostModalsProps) {
  return selectBlockModalOpen && <SelectBlockModal setModalOpen={setSelectBlockModalOpen}></SelectBlockModal>;
}
export default CreatePostModals;

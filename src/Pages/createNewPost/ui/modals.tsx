import SelectBlockModal from '@/Pages/create-new/create-new-post/select-block-modal';

interface CreatePostModalsProps {
    selectBlockModalOpen: boolean;
    setSelectBlockModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModals({
    selectBlockModalOpen,
    setSelectBlockModalOpen,
}: CreatePostModalsProps) {
    return (
        selectBlockModalOpen && (
            <SelectBlockModal
                setModalOpen={setSelectBlockModalOpen}
            ></SelectBlockModal>
        )
    );
}
export default CreatePostModals;

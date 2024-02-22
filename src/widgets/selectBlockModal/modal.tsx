import {
  Button,
  ButtonIcons,
  ButtonTypes,
  NavBarIcons,
  buttonIcons,
  formContainer,
  formItem,
  navBarIcons,
} from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { addNewBlock, blockTypes } from '@/app/slices/wite-post/write-post-slice';
import { CloseModal, IsModal } from '@/shared/isModal';
import { motion } from 'framer-motion';

const SelectBlockModal = ({ setModalOpen }: { setModalOpen: (value: React.SetStateAction<boolean>) => void }) => {
  const dispatch = useAppDispatch();
  return (
    <IsModal setModalOpen={setModalOpen}>
      <motion.ul {...formContainer} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <Button
          Variants={formItem}
          Type={ButtonTypes.active}
          Title="Текст"
          Click={() => {
            dispatch(addNewBlock({ newBlockType: blockTypes.Text }));
            CloseModal();
          }}
        >
          <ButtonIcons Icon={buttonIcons.MarkDown}></ButtonIcons>
        </Button>
        <Button
          Variants={formItem}
          Type={ButtonTypes.active}
          Title="Картинка"
          Click={() => {
            dispatch(addNewBlock({ newBlockType: blockTypes.Image }));
            CloseModal();
          }}
        >
          <ButtonIcons Icon={buttonIcons.Image}></ButtonIcons>
        </Button>
        <Button
          Variants={formItem}
          Type={ButtonTypes.active}
          Title="Код"
          Click={() => {
            dispatch(addNewBlock({ newBlockType: blockTypes.Code }));
            CloseModal();
          }}
        >
          <ButtonIcons Icon={buttonIcons.Code}></ButtonIcons>
        </Button>
        <Button
          Variants={formItem}
          Type={ButtonTypes.active}
          Title="Опрос"
          Click={() => {
            dispatch(addNewBlock({ newBlockType: blockTypes.Survey }));
            CloseModal();
          }}
        >
          <NavBarIcons Icon={navBarIcons.Statistic}></NavBarIcons>
        </Button>
      </motion.ul>
    </IsModal>
  );
};

export default SelectBlockModal;

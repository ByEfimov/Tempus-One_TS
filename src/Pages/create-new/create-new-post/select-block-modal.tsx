import Styles from './Styles.module.scss';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    NavBarIcons,
    buttonIcons,
    formContainer,
    formItem,
    navBarIcons,
} from 'Assets/Tempus-Ui';
import { CloseModal, IsModal } from 'Components/modals/is-modal';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    addNewBlock,
    blockTypes,
} from 'Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';

const SelectBlockModal = ({
    setModalOpen,
}: {
    setModalOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
    const dispatch = useAppDispatch();
    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.ul
                variants={formContainer}
                initial="hidden"
                animate="visible"
                className={Styles.Modal}
            >
                <Button
                    Variants={formItem}
                    Type={ButtonTypes.active}
                    Title="Текст"
                    Click={() => {
                        dispatch(
                            addNewBlock({ newBlockType: blockTypes.Text }),
                        );
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
                        dispatch(
                            addNewBlock({ newBlockType: blockTypes.Image }),
                        );
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
                        dispatch(
                            addNewBlock({ newBlockType: blockTypes.Code }),
                        );
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
                        dispatch(
                            addNewBlock({ newBlockType: blockTypes.Survey }),
                        );
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
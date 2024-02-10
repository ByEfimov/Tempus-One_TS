import Styles from './Header.module.scss';
import {
    HeaderIcons,
    IconPositions,
    Input,
    InputTypes,
    headerIcons,
} from 'Assets/Tempus-Ui';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useHeader } from 'Hooks/useHeader';
import { setInputSearchBar } from 'Store/slices/header/header-slice';
import { TypesOfHeader } from 'Types/TypesOfData/header/header-type';
import { motion } from 'framer-motion';

const Header = () => {
    const {
        HeaderTitle,
        HeaderSearchBar,
        HeaderClickBack,
        PlaceholderForInput,
        ButtonExecute,
        HeaderType,
    } = useHeader();
    const dispatch = useAppDispatch();

    if (HeaderType === TypesOfHeader.WithoutSearchBar) {
        return (
            <motion.header
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={Styles.Header}
            >
                {HeaderClickBack && (
                    <button onClick={HeaderClickBack}>
                        <HeaderIcons Icon={headerIcons.Back} />
                    </button>
                )}
                <h1 className={Styles.Header__Title}>{HeaderTitle}</h1>
                {ButtonExecute?.function && (
                    <button>
                        <HeaderIcons Icon={ButtonExecute.icon}></HeaderIcons>
                    </button>
                )}
                {ButtonExecute?.component && ButtonExecute.component}
            </motion.header>
        );
    } else {
        return (
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={Styles.Header}
            >
                <Input
                    Value={HeaderSearchBar}
                    Type={InputTypes.text}
                    Change={(e) => {
                        dispatch(
                            setInputSearchBar({ SearchBar: e.target.value }),
                        );
                    }}
                    Placeholder={PlaceholderForInput}
                    Icon={<HeaderIcons Icon={headerIcons.Search} />}
                    SearchFun={ButtonExecute?.function}
                    IconPosition={IconPositions.rigth}
                ></Input>
                {ButtonExecute && (
                    <button
                        onClick={() =>
                            ButtonExecute.function && ButtonExecute.function()
                        }
                    >
                        <HeaderIcons Icon={ButtonExecute.icon}></HeaderIcons>
                    </button>
                )}
            </motion.header>
        );
    }
};
export default Header;

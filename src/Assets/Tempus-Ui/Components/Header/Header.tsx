import Input, { IconPositions, InputTypes } from '../Inputs/Input';
import Styles from './Header.module.scss';
import HeaderIcons, {
    headerIcons,
} from 'Assets/Tempus-Ui/Icons/Header/Header-Icons';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useHeader } from 'Hooks/useHeader';
import { setInputSearchBar } from 'Store/slices/header/header-slice';
import { TypesOfHeader } from 'Types/TypesOfData/header/header-type';
import { motion } from 'framer-motion';

export default function Header() {
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
                {ButtonExecute && (
                    <button>
                        <HeaderIcons Icon={ButtonExecute.icon}></HeaderIcons>
                    </button>
                )}
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
                        dispatch(setInputSearchBar(e.target.value));
                    }}
                    Placeholder={PlaceholderForInput}
                    Icon={<HeaderIcons Icon={headerIcons.Search} />}
                    IconPosition={IconPositions.rigth}
                ></Input>
                {ButtonExecute && (
                    <button>
                        <HeaderIcons Icon={ButtonExecute.icon}></HeaderIcons>
                    </button>
                )}
            </motion.header>
        );
    }
}

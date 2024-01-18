import BackIcon from '../../Icons/Header/back.svg';
import SearchIcon from '../../Icons/Header/search.svg';
import Input, { IconPositions, InputTypes } from '../Inputs/Input';
import Styles from './Header.module.scss';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useHeader } from 'Hooks/useHeader';
import { setInputSearchBar } from 'Store/slices/Header/HeaderSlice';
import { TypesOfHeader } from 'Types/TypesOfData/Header/HeaderType';
import { motion } from 'framer-motion';

export default function Header() {
    const {
        HeaderTitle,
        HeaderSearchBar,
        HeaderClickBack,
        HeaderClickExecute,
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
                        <img src={BackIcon} alt="" />
                    </button>
                )}
                <h1 className={Styles.Header__Title}>{HeaderTitle}</h1>
                {HeaderClickExecute && (
                    <button onClick={() => HeaderClickExecute()}>\/</button>
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
                    Placeholder="Найти пост..."
                    Icon={SearchIcon}
                    IconPosition={IconPositions.rigth}
                ></Input>
            </motion.header>
        );
    }
}

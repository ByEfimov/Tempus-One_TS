import BackIcon from '../Icons/Header/BackIcon.svg';
import Styles from './Header.module.scss';
import CustomInput from 'Components/MiniComponents/input';
import { useHeader } from 'Hooks/useHeader';
import { TypesOfHeader } from 'Types/TypesOfData/Header/HeaderType';

export default function Header() {
    const { HeaderTitle, HeaderClickBack, HeaderClickExecute, HeaderType } =
        useHeader();

    if (HeaderType === TypesOfHeader.WithoutSearchBar) {
        return (
            <header className={Styles.Header}>
                {HeaderClickBack && (
                    <button onClick={HeaderClickBack}>
                        <img src={BackIcon} alt="" />
                    </button>
                )}
                <h1 className={Styles.Header__Title}>{HeaderTitle}</h1>
                {HeaderClickExecute && (
                    <button onClick={() => HeaderClickExecute()}>\/</button>
                )}
            </header>
        );
    } else {
        return (
            <header className={Styles.Header}>
                <CustomInput
                    mode="default"
                    changeFunction={() => {}}
                    placeholder="Найти пост..."
                ></CustomInput>
            </header>
        );
    }
}

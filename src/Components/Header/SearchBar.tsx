import Styles from './Header.module.scss';
import SearchIcon from 'Assets/Icons/Header/search.svg';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useHeader } from 'Hooks/useHeader';
import { setInputSearchBar } from 'Store/slices/Header/HeaderSlice';
import React, { LegacyRef, useEffect } from 'react';

const SearchBarComp = () => {
    const dispatch = useAppDispatch();
    const { HeaderSearchBar, HeaderAnim } = useHeader();
    const SearchBar: LegacyRef<HTMLDivElement> = React.createRef();
    const SearchInput: LegacyRef<HTMLInputElement> = React.createRef();

    useEffect(() => {
        if (HeaderAnim === 'Open') {
            SearchBar.current?.classList.toggle(Styles.openSearchBar);
        } else {
            SearchBar.current?.classList.toggle(Styles.closeSearchBar);
        }
    }, [HeaderAnim]);

    return (
        <div className={Styles.SearchBar} ref={SearchBar}>
            <button
                className={Styles.SearchIcon}
                onClick={() =>
                    dispatch(
                        setInputSearchBar({
                            SearchBar: SearchInput.current?.value,
                        }),
                    )
                }
            >
                <img src={SearchIcon} alt="" />
            </button>
            <input
                ref={SearchInput}
                type="text"
                placeholder="Поиск"
                className={Styles.Input}
                defaultValue={HeaderSearchBar}
            />
        </div>
    );
};

export default SearchBarComp;

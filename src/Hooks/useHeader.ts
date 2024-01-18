import { useAppSelector } from './redux-hooks';

export function useHeader() {
    const {
        Title,
        Type,
        SearchBar,
        HeaderClickBack,
        ShowFooter,
        ButtonExecute,
        PlaceholderForInput,
    } = useAppSelector((state) => state.Header);

    return {
        HeaderTitle: Title,
        HeaderType: Type,
        HeaderSearchBar: SearchBar,
        HeaderClickBack: HeaderClickBack,
        ButtonExecute,
        ShowFooter,
        PlaceholderForInput,
    };
}

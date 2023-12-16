import { useAppSelector } from './redux-hooks';

export function useHeader() {
    const { Title, Type, SearchBar, TypeOfButton } = useAppSelector(
        (state) => state.Header
    );

    return {
        HeaderTitle: Title,
        HeaderType: Type,
        HeaderSearchBar: SearchBar,
        HeaderTypeOfButton: TypeOfButton,
    };
}

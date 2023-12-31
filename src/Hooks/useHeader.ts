import { useAppSelector } from './redux-hooks';

export function useHeader() {
    const { Title, Type, SearchBar, TypeOfButton, Animation } = useAppSelector(
        (state) => state.Header,
    );

    return {
        HeaderAnim: Animation,
        HeaderTitle: Title,
        HeaderType: Type,
        HeaderSearchBar: SearchBar,
        HeaderTypeOfButton: TypeOfButton,
    };
}

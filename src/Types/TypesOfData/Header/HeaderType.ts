export type HeaderType = {
    Title: string;
    SearchBar: string;
    Type: TypesOfHeader;
    HeaderClickBack?: () => void;
    HeaderClickExecute?: () => void;
    ShowFooter: boolean;
};

export enum TypesOfHeader {
    WithSearchBar = 'WithSearchBar',
    WithoutSearchBar = 'WithoutSearchBar',
}

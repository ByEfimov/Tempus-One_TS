import { headerIcons } from 'Assets/Tempus-Ui/Icons/Header/Header-Icons';

export type HeaderType = {
    Title: string;
    SearchBar: string;
    Type: TypesOfHeader;
    HeaderClickBack?: () => void;
    ButtonExecute?:
        | { icon: headerIcons; function: (() => void) | undefined }
        | undefined;
    ShowFooter: boolean;
    PlaceholderForInput: string;
};

export enum TypesOfHeader {
    WithSearchBar = 'WithSearchBar',
    WithoutSearchBar = 'WithoutSearchBar',
}

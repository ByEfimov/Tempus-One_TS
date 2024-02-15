import { headerIcons } from 'Assets/Tempus-Ui/Icons/Header/header-icons';
import { ReactNode } from 'react';

export type HeaderType = {
    Title: string;
    SearchBar: string;
    Type: TypesOfHeader;
    HeaderClickBack?: () => void;
    ButtonExecute?:
        | {
              icon: headerIcons;
              function?: (() => void) | undefined;
              component?: ReactNode;
          }
        | undefined;
    ShowNavBar: boolean;
    PlaceholderForInput: string;
};

export enum TypesOfHeader {
    WithSearchBar = 'WithSearchBar',
    WithoutSearchBar = 'WithoutSearchBar',
}

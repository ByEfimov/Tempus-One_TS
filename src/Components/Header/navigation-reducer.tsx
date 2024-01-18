import { useAppDispatch } from 'Hooks/redux-hooks';
import { setHeader, setTypeOfHeader } from 'Store/slices/Header/HeaderSlice';
import { TypesOfHeader } from 'Types/TypesOfData/Header/HeaderType';
import AppRoutes from 'Utils/Routes/app-routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavigationReducer() {
    const location = useLocation().pathname;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const Path = location.split('/')[1];

        const ThenHaveSearchBar =
            Path === '' || Path === 'Users' || Path === 'Teams';
        const HeaderHaveSearchBar = ThenHaveSearchBar ? true : false;

        let TitleOfHeader = '';
        let PathOfBack = '';
        let ShowFooter = true;

        switch ('/' + Path) {
            case AppRoutes.WRITENEWPOST:
                TitleOfHeader = 'Новый пост';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = false;
                break;
            case AppRoutes.CREATENEWTEAM:
                TitleOfHeader = 'Новое сообщество';
                PathOfBack = AppRoutes.TEAMS;
                ShowFooter = false;
                break;
            case AppRoutes.TEAM:
                TitleOfHeader = 'Сообщество';
                PathOfBack = AppRoutes.TEAMS;
                ShowFooter = true;
                break;
            case AppRoutes.USER:
                TitleOfHeader = 'Профиль';
                PathOfBack = AppRoutes.USERS;
                ShowFooter = true;
                break;
            case AppRoutes.POST:
                TitleOfHeader = 'Пост';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = true;
                break;
            case AppRoutes.LOGIN:
                TitleOfHeader = 'Tempus-ID';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = false;
                break;
            case AppRoutes.REGISTER:
                TitleOfHeader = 'Tempus-ID';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = false;
                break;
            case AppRoutes.VERIFYINGEMAIL:
                TitleOfHeader = 'Tempus-ID';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = false;
                break;
            case AppRoutes.SERVICES:
                TitleOfHeader = 'Сервисы';
                ShowFooter = true;
                break;
            case AppRoutes.STATISTIC:
                TitleOfHeader = 'Статистика';
                ShowFooter = true;
                break;
            default:
                TitleOfHeader = '';
                PathOfBack = '';
                ShowFooter = true;
                break;
        }

        const clickBack = PathOfBack
            ? () => {
                  navigate(PathOfBack);
              }
            : undefined;

        if (!HeaderHaveSearchBar) {
            dispatch(
                setHeader({
                    Type: TypesOfHeader.WithoutSearchBar,
                    Title: TitleOfHeader,
                    HeaderClickBack: clickBack,
                    HeaderClickExecute: undefined,
                    ShowFooter,
                }),
            );
        } else {
            dispatch(
                setTypeOfHeader({
                    Type: TypesOfHeader.WithSearchBar,
                    ShowFooter,
                }),
            );
        }
    }, [location]);

    return <></>;
}

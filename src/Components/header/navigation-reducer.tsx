import { headerIcons } from 'Assets/Tempus-Ui/Icons/Header/header-icons';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setHeader, setTypeOfHeader } from 'Store/slices/header/header-slice';
import { TypesOfHeader } from 'Types/TypesOfData/header/header-type';
import AppRoutes from 'Utils/routes/app-routes';
import { ReactNode, useEffect } from 'react';
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
        let placeholderForInput = 'Найти пост...';
        let ExecuteConfig:
            | {
                  icon: headerIcons;
                  function: (() => void) | undefined;
                  component?: ReactNode;
              }
            | undefined = undefined;

        switch ('/' + Path) {
            case AppRoutes.WRITENEWPOST:
                TitleOfHeader = 'Новый пост';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = false;
                ExecuteConfig = { icon: headerIcons.Add, function: undefined };
                break;
            case AppRoutes.CREATENEWTEAM:
                TitleOfHeader = 'Новое сообщество';
                PathOfBack = AppRoutes.TEAMS;
                ShowFooter = false;
                ExecuteConfig = { icon: headerIcons.Add, function: undefined };
                break;
            case AppRoutes.TEAM:
                TitleOfHeader = 'Сообщество';
                PathOfBack = AppRoutes.TEAMS;
                ShowFooter = true;
                ExecuteConfig = {
                    icon: headerIcons.SubTeam,
                    function: undefined,
                };
                break;
            case AppRoutes.USER:
                TitleOfHeader = 'Профиль';
                PathOfBack = AppRoutes.USERS;
                ShowFooter = true;
                ExecuteConfig = { icon: headerIcons.Sub, function: undefined };
                break;
            case AppRoutes.POST:
                TitleOfHeader = 'Пост';
                PathOfBack = AppRoutes.DEFAULT;
                ShowFooter = true;
                ExecuteConfig = {
                    icon: headerIcons.Settings,
                    function: undefined,
                };
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
            case AppRoutes.USERS:
                placeholderForInput = 'Найти профиль...';
                ShowFooter = true;
                ExecuteConfig = {
                    icon: headerIcons.Teams,
                    function: () => navigate(AppRoutes.TEAMS),
                };
                break;
            case AppRoutes.TEAMS:
                placeholderForInput = 'Найти сообщество...';
                ShowFooter = true;
                ExecuteConfig = {
                    icon: headerIcons.Add,
                    function: () => navigate(AppRoutes.CREATENEWTEAM),
                };
                break;
            case AppRoutes.MYPROFILE:
                TitleOfHeader = 'Мой профиль';
                ShowFooter = true;
                break;
            case AppRoutes.DEFAULT:
                TitleOfHeader = '';
                PathOfBack = '';
                ShowFooter = true;
                ExecuteConfig = {
                    icon: headerIcons.Add,
                    function: () => navigate(AppRoutes.WRITENEWPOST),
                };
                break;
            default:
                TitleOfHeader = '';
                PathOfBack = '';
                ShowFooter = true;
                ExecuteConfig = {
                    icon: headerIcons.Add,
                    function: () => navigate(AppRoutes.WRITENEWPOST),
                };
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
                    Title: TitleOfHeader,
                    Type: TypesOfHeader.WithoutSearchBar,
                    ButtonExecute: ExecuteConfig,
                    ShowFooter,
                    HeaderClickBack: clickBack,
                }),
            );
        } else {
            dispatch(
                setTypeOfHeader({
                    Type: TypesOfHeader.WithSearchBar,
                    ShowFooter,
                    placeholderForInput,
                    ButtonExecute: ExecuteConfig,
                }),
            );
        }
    }, [location]);

    return <></>;
}

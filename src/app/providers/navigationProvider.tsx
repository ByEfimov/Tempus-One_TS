import { headerIcons } from '../assets/Tempus-Ui';
import { useAppDispatch } from '../hooks/redux-hooks';
import { setHeader, setTypeOfHeader } from '../slices/header/headerSlice';
import { TypesOfHeader } from '../types/TypesOfData/header/header-type';
import AppRoutes from '@/shared/routes/app-routes';
import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavigationReducer({ children }: { children: React.ReactChild | React.ReactNode }) {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const Path = location.split('/')[1];

    const screenMobile = window.innerWidth < 900;

    const ThenHaveSearchBar = Path === '' || Path === 'Users' || Path === 'Teams';
    const HeaderHaveSearchBar = ThenHaveSearchBar ? true : false;

    let TitleOfHeader = '';
    let PathOfBack = '';
    let ShowNavBar = true;
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
        ShowNavBar = false;
        ExecuteConfig = { icon: headerIcons.Add, function: undefined };
        break;
      case AppRoutes.CREATENEWTEAM:
        TitleOfHeader = 'Новое сообщество';
        PathOfBack = AppRoutes.TEAMS;
        ShowNavBar = false;
        ExecuteConfig = { icon: headerIcons.Add, function: undefined };
        break;
      case AppRoutes.TEAM:
        TitleOfHeader = 'Сообщество';
        PathOfBack = AppRoutes.TEAMS;
        ShowNavBar = screenMobile ? true : false;
        ExecuteConfig = {
          icon: headerIcons.SubTeam,
          function: undefined,
        };
        break;
      case AppRoutes.USER:
        TitleOfHeader = 'Профиль';
        PathOfBack = AppRoutes.USERS;
        ShowNavBar = screenMobile ? true : false;
        ExecuteConfig = { icon: headerIcons.Sub, function: undefined };
        break;
      case AppRoutes.POST:
        TitleOfHeader = 'Пост';
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = screenMobile ? true : false;
        ExecuteConfig = {
          icon: headerIcons.Settings,
          function: undefined,
        };
        break;
      case AppRoutes.LOGIN:
        TitleOfHeader = 'Tempus-ID';
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = false;
        break;
      case AppRoutes.REGISTER:
        TitleOfHeader = 'Tempus-ID';
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = false;
        break;
      case AppRoutes.VERIFYINGEMAIL:
        TitleOfHeader = 'Tempus-ID';
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = false;
        break;
      case AppRoutes.SERVICES:
        TitleOfHeader = 'Сервисы';
        ShowNavBar = true;
        break;
      case AppRoutes.STATISTIC:
        TitleOfHeader = 'Статистика';
        ShowNavBar = true;
        break;
      case AppRoutes.USERS:
        placeholderForInput = 'Найти профиль...';
        ShowNavBar = true;
        ExecuteConfig = {
          icon: headerIcons.Teams,
          function: () => navigate(AppRoutes.TEAMS),
        };
        break;
      case AppRoutes.TEAMS:
        placeholderForInput = 'Найти сообщество...';
        ShowNavBar = true;
        ExecuteConfig = {
          icon: headerIcons.Add,
          function: () => navigate(AppRoutes.CREATENEWTEAM),
        };
        break;
      case AppRoutes.MYPROFILE:
        TitleOfHeader = 'Мой профиль';
        ShowNavBar = screenMobile ? true : false;
        break;
      case AppRoutes.DEFAULT:
        TitleOfHeader = '';
        PathOfBack = '';
        ShowNavBar = true;
        ExecuteConfig = {
          icon: headerIcons.Add,
          function: () => navigate(AppRoutes.WRITENEWPOST),
        };
        break;
      default:
        TitleOfHeader = '';
        PathOfBack = '';
        ShowNavBar = true;
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
          ShowNavBar,
          HeaderClickBack: clickBack,
        }),
      );
    } else {
      dispatch(
        setTypeOfHeader({
          Type: TypesOfHeader.WithSearchBar,
          ShowNavBar,
          placeholderForInput,
          ButtonExecute: ExecuteConfig,
        }),
      );
    }
  }, [location]);

  return children;
}

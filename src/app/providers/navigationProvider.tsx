import { headerIcons } from '../assets/Tempus-Ui';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useAuth } from '../hooks/useAuth';
import { setHeader, setTypeOfHeader } from '../slices/header/headerSlice';
import { TypesOfHeader } from '../types/TypesOfData/header/header-type';
import { NOTIFI_TEXTS } from '@/shared/notifyTexts/notifyTexts';
import AppRoutes from '@/shared/routes/app-routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TITLES_OF_HEADER = {
  NEW_POST: 'Новый пост',
  NEW_TEAM: 'Новое сообщество',
  TEAM: 'Сообщество',
  PROFILE: 'Профиль',
  POST: 'Пост',
  TEMPUS_ID: 'Tempus-ID',
  SERVICES: 'Сервисы',
  STATISTIC: 'Статистика',
  MY_PROFILE: 'Мой профиль',
};

const PLACEHOLDERS_HEADER_INPUT = {
  SEARCH_POST: 'Найти пост...',
  SEARCH_TEAM: 'Найти сообщество...',
  SEARCH_USER: 'Найти профиль...',
};

export default function NavigationReducer({ children }: { children: React.ReactChild | React.ReactNode }) {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { UserEmailVerified, UserIsAuth } = useAuth();

  useEffect(() => {
    const Path = location.split('/')[1];
    const screenMobile = window.innerWidth < 900;
    const ThenHaveSearchBar = ['', 'Users', 'Teams'].includes(Path);
    const HeaderHaveSearchBar = ThenHaveSearchBar;

    let TitleOfHeader = '';
    let PathOfBack = '';
    let ShowNavBar = true;
    let placeholderForInput = ThenHaveSearchBar
      ? Path === 'Users'
        ? PLACEHOLDERS_HEADER_INPUT.SEARCH_USER
        : PLACEHOLDERS_HEADER_INPUT.SEARCH_TEAM
      : PLACEHOLDERS_HEADER_INPUT.SEARCH_POST;
    let ExecuteConfig;

    switch ('/' + Path) {
      case AppRoutes.WRITENEWPOST:
        TitleOfHeader = TITLES_OF_HEADER.NEW_POST;
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = false;
        ExecuteConfig = { icon: headerIcons.Add, function: undefined };
        break;
      case AppRoutes.CREATENEWTEAM:
        TitleOfHeader = TITLES_OF_HEADER.NEW_TEAM;
        PathOfBack = AppRoutes.TEAMS;
        ShowNavBar = false;
        ExecuteConfig = { icon: headerIcons.Add, function: undefined };
        break;
      case AppRoutes.TEAM:
        TitleOfHeader = TITLES_OF_HEADER.TEAM;
        PathOfBack = AppRoutes.TEAMS;
        ShowNavBar = screenMobile;
        ExecuteConfig = { icon: headerIcons.SubTeam, function: undefined };
        break;
      case AppRoutes.USER:
        TitleOfHeader = TITLES_OF_HEADER.PROFILE;
        PathOfBack = AppRoutes.USERS;
        ShowNavBar = screenMobile;
        ExecuteConfig = { icon: headerIcons.Sub, function: undefined };
        break;
      case AppRoutes.POST:
        TitleOfHeader = TITLES_OF_HEADER.POST;
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = screenMobile;
        ExecuteConfig = { icon: headerIcons.Settings, function: undefined };
        break;
      case AppRoutes.LOGIN:
      case AppRoutes.REGISTER:
      case AppRoutes.VERIFYINGEMAIL:
        TitleOfHeader = TITLES_OF_HEADER.TEMPUS_ID;
        PathOfBack = AppRoutes.DEFAULT;
        ShowNavBar = false;
        break;
      case AppRoutes.SERVICES:
      case AppRoutes.STATISTIC:
        TitleOfHeader = Path.split('/')[1];
        ShowNavBar = true;
        break;
      case AppRoutes.USERS:
        placeholderForInput = PLACEHOLDERS_HEADER_INPUT.SEARCH_USER;
        ShowNavBar = true;
        ExecuteConfig = { icon: headerIcons.Teams, function: () => navigate(AppRoutes.TEAMS) };
        break;
      case AppRoutes.TEAMS:
        placeholderForInput = PLACEHOLDERS_HEADER_INPUT.SEARCH_TEAM;
        ShowNavBar = true;
        ExecuteConfig = {
          icon: headerIcons.Add,
          function: () => {
            if (UserIsAuth && UserEmailVerified) navigate(AppRoutes.CREATENEWTEAM);
            else if (!UserIsAuth) toast.error(NOTIFI_TEXTS.ERROR_NOT_AUTH);
            else if (!UserEmailVerified) toast.warning(NOTIFI_TEXTS.ERROR_NOT_VERIFIED_EMAIL);
          },
        };
        break;
      case AppRoutes.MYPROFILE:
        TitleOfHeader = TITLES_OF_HEADER.MY_PROFILE;
        ShowNavBar = screenMobile;
        break;
      case AppRoutes.DEFAULT:
      default:
        TitleOfHeader = '';
        PathOfBack = '';
        ShowNavBar = true;
        ExecuteConfig = {
          icon: headerIcons.Add,
          function: () => {
            if (UserIsAuth && UserEmailVerified) navigate(AppRoutes.WRITENEWPOST);
            else if (!UserIsAuth) toast.error(NOTIFI_TEXTS.ERROR_NOT_AUTH);
            else if (!UserEmailVerified) toast.error(NOTIFI_TEXTS.ERROR_NOT_VERIFIED_EMAIL);
          },
        };
        break;
    }

    const clickBack = PathOfBack ? () => navigate(PathOfBack) : undefined;

    dispatch(
      !HeaderHaveSearchBar
        ? setHeader({
            Title: TitleOfHeader,
            Type: TypesOfHeader.WithoutSearchBar,
            ButtonExecute: ExecuteConfig,
            ShowNavBar,
            HeaderClickBack: clickBack,
          })
        : setTypeOfHeader({
            Type: TypesOfHeader.WithSearchBar,
            ShowNavBar,
            placeholderForInput,
            ButtonExecute: ExecuteConfig,
          }),
    );
  }, [location]);

  return children;
}

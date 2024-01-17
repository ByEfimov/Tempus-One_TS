import { useAppDispatch } from 'Hooks/redux-hooks';
import { setHeader } from 'Store/slices/Header/HeaderSlice';
import { TypesOfHeader } from 'Types/TypesOfData/Header/HeaderType';
import AppRoutes from 'Utils/Routes/app-routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function HeaderReducer() {
    const location = useLocation().pathname;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const Path = location.split('/')[1];

        const ThenHaveSearchBar =
            Path === '' || Path === 'Users' || Path === 'Teams';
        const HeaderHaveSearchBar = ThenHaveSearchBar ? true : false;

        let TitleOfHeader = '';
        let PathOfBack = AppRoutes.DEFAULT;

        switch ('/' + Path) {
            case AppRoutes.WRITENEWPOST:
                TitleOfHeader = 'Новый пост';
                PathOfBack = AppRoutes.DEFAULT;
                break;
            case AppRoutes.CREATENEWTEAM:
                TitleOfHeader = 'Новое сообщество';
                PathOfBack = AppRoutes.TEAMS;
                break;
            case AppRoutes.TEAM:
                TitleOfHeader = 'Сообщество';
                PathOfBack = AppRoutes.TEAMS;
                break;
            case AppRoutes.USER:
                TitleOfHeader = 'Пользователь';
                PathOfBack = AppRoutes.USERS;
                break;
            case AppRoutes.POST:
                TitleOfHeader = 'Пост';
                PathOfBack = AppRoutes.DEFAULT;
                break;
            case AppRoutes.LOGIN:
                TitleOfHeader = 'Tempus-ID';
                PathOfBack = AppRoutes.DEFAULT;
                break;
            case AppRoutes.REGISTER:
                TitleOfHeader = 'Tempus-ID';
                PathOfBack = AppRoutes.DEFAULT;
                break;
            case AppRoutes.VERIFYINGEMAIL:
                TitleOfHeader = 'Tempus-ID';
                PathOfBack = AppRoutes.DEFAULT;
                break;
            default:
                TitleOfHeader = '';
                PathOfBack = AppRoutes.DEFAULT;
                break;
        }

        if (!HeaderHaveSearchBar) {
            dispatch(
                setHeader({
                    Type: TypesOfHeader.WithoutSearchBar,
                    Title: TitleOfHeader,
                    HeaderClickBack: () => navigate(PathOfBack),
                }),
            );
        } else {
            dispatch(
                setHeader({
                    Type: TypesOfHeader.WithSearchBar,
                }),
            );
        }
    }, [location]);

    return <></>;
}

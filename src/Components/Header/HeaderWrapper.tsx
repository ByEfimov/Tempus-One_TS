import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    TypesOfHeader,
    setAnimOfHeader,
    setHeader,
    setTitleOfHeader,
} from 'Store/slices/Header/HeaderSlice';

const HeaderWrapper = ({
    children,
}: {
    children: React.ReactChild | React.ReactNode;
}) => {
    const location = useLocation().pathname;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const Path = location.split('/')[1];

        const ThenHaveSearchBar =
            Path === '' || Path === 'Users' || Path === 'Teams';

        function HeaderHaveSearchBar() {
            if (ThenHaveSearchBar) {
                return true;
            } else {
                return false;
            }
        }

        let TitleOfHeader = 'TEMPUS';
        switch (Path) {
            case '':
                TitleOfHeader = 'TEMPUS';
                break;
            case 'Users':
                TitleOfHeader = 'Все люди';
                break;
            case 'Teams':
                TitleOfHeader = 'Сообщества';
                break;
            case 'WriteNewPost':
                TitleOfHeader = 'Новый пост';
                break;
            case 'CreateNewTeam':
                TitleOfHeader = 'Новое сообщество';
                break;
            case 'Team':
                TitleOfHeader = 'Сообщество';
                break;
            case 'User':
                TitleOfHeader = 'Человек';
                break;
            case 'Post':
                TitleOfHeader = 'Пост';
                break;
            case 'Login':
                TitleOfHeader = 'Вход';
                break;
            case 'Register':
                TitleOfHeader = 'Регистрация';
                break;
            case 'NeedAuth':
                TitleOfHeader = 'Нужен вход';
                break;
            case 'VerifyingEmail':
                TitleOfHeader = 'Подтверждение почты';
                break;
        }

        if (HeaderHaveSearchBar()) {
            dispatch(setAnimOfHeader({ Animation: 'Open' }));

            dispatch(
                setHeader({
                    Type: TypesOfHeader.WithSearchBar,
                    Title: TitleOfHeader,
                })
            );
        } else {
            dispatch(setAnimOfHeader({ Animation: 'Close' }));
            dispatch(setTitleOfHeader({ Title: TitleOfHeader }));
            setTimeout(() => {
                dispatch(
                    setHeader({
                        Type: TypesOfHeader.WithoutSearchBar,
                        Title: TitleOfHeader,
                    })
                );
            }, 500);
        }
    }, [location]);

    return children;
};
export default HeaderWrapper;

import { Header, NavBar, navBarIcons } from 'Assets/Tempus-Ui';
import { Notifications } from 'Components/notifications/notifications';
import { useAuth } from 'Hooks/useAuth';
import AllTeams from 'Pages/all-teams/all-teams';
import AllUsers from 'Pages/all-users/all-users';
import ForgotPasswordPage from 'Pages/authentication/forgot-password';
import LoginPage from 'Pages/authentication/login';
import RegisterPage from 'Pages/authentication/register';
import VerifyingEmail from 'Pages/authentication/verified-email/verified-email';
import WritePost from 'Pages/create-new/create-new-post/WritePost';
import CreateTeam from 'Pages/create-new/create-new-team/CreateTeam';
import MainPage from 'Pages/main-page/MainPage';
import MyProfile from 'Pages/my-profile/my-profile';
import PostPage from 'Pages/open-pages/open-post/post-page';
import TeamPage from 'Pages/open-pages/open-team/team-page';
import UserPage from 'Pages/open-pages/open-user/user-page';
import AppRoutes from 'Utils/routes/app-routes';
import { Route, Routes } from 'react-router-dom';

function App() {
    const { PathToProfile, UserIsAuth } = useAuth();

    const navBarLinks = [
        {
            name: 'Home',
            path: [AppRoutes.DEFAULT, AppRoutes.POST],
            icon: navBarIcons.Home,
        },
        {
            name: 'Services',
            path: [AppRoutes.SERVICES],
            icon: navBarIcons.Services,
        },
        {
            name: 'Users',
            path: [
                AppRoutes.USERS,
                AppRoutes.TEAM,
                AppRoutes.TEAMS,
                AppRoutes.USER,
            ],
            blackList: [PathToProfile],
            icon: navBarIcons.Users,
        },
        {
            name: 'Statistic',
            path: [AppRoutes.STATISTIC],
            icon: navBarIcons.Statistic,
        },
        {
            name: 'Profile',
            path: [
                UserIsAuth ? AppRoutes.MYPROFILE : AppRoutes.LOGIN,
                PathToProfile,
            ],
            icon: navBarIcons.User,
        },
    ];

    return (
        <>
            <Header />
            <Notifications />
            <Routes>
                <Route path={AppRoutes.DEFAULT} element={<MainPage />} />
                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
                <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
                <Route
                    path={AppRoutes.VERIFYINGEMAIL}
                    element={<VerifyingEmail />}
                />
                <Route path={AppRoutes.WRITENEWPOST} element={<WritePost />} />
                <Route
                    path={AppRoutes.CREATENEWTEAM}
                    element={<CreateTeam />}
                />
                <Route path={AppRoutes.USERS} element={<AllUsers />} />
                <Route path={AppRoutes.TEAMS} element={<AllTeams />} />
                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
                <Route path={AppRoutes.MYPROFILE} element={<MyProfile />} />
                <Route path={AppRoutes.USER + '/:id'} element={<UserPage />} />
                <Route path={AppRoutes.POST + '/:id'} element={<PostPage />} />
                <Route path={AppRoutes.TEAM + '/:id'} element={<TeamPage />} />
                <Route
                    path={AppRoutes.FORGOTPASSWORD}
                    element={<ForgotPasswordPage />}
                />
            </Routes>
            <NavBar Links={navBarLinks}></NavBar>
        </>
    );
}

export default App;

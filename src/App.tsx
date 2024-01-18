import Header from 'Assets/Tempus-Ui/Components/Header/Header';
import NavBar from 'Assets/Tempus-Ui/Components/Nav-bar/Nav-bar';
import { footerIcons } from 'Assets/Tempus-Ui/Icons/Footer/FooterIcons';
import { Notifications } from 'Components/Notifications/Notifications';
import { useAuth } from 'Hooks/useAuth';
import AllTeams from 'Pages/AllTeams/AllTeams';
import AllUsers from 'Pages/AllUsers/AllUsers';
import ForgotPasswordPage from 'Pages/Authentication/ForgotPasswordPage';
import LoginPage from 'Pages/Authentication/LoginPage';
import RegisterPage from 'Pages/Authentication/RegisterPage';
import CreateTeam from 'Pages/CreateNewTeam/CreateTeam';
import MainPage from 'Pages/MainPage/MainPage';
import PostPage from 'Pages/OpenPost/PostPage';
import TeamPage from 'Pages/OpenTeam/TeamPage';
import UserPage from 'Pages/OpenUser/UserPage';
import VerifyingEmail from 'Pages/VerifiedEmail/VerifiedEmail';
import WritePost from 'Pages/WriteHewPost/WritePost';
import AppRoutes from 'Utils/Routes/app-routes';
import { Route, Routes } from 'react-router-dom';

function App() {
    const { PathToProfile } = useAuth();

    const navBarLinks = [
        { name: 'Home', path: AppRoutes.DEFAULT, icon: footerIcons.Home },
        {
            name: 'Services',
            path: AppRoutes.SERVICES,
            icon: footerIcons.Services,
        },
        { name: 'Users', path: AppRoutes.USERS, icon: footerIcons.Users },
        {
            name: 'Statistic',
            path: AppRoutes.STATISTIC,
            icon: footerIcons.Statistic,
        },
        { name: 'Profile', path: PathToProfile, icon: footerIcons.User },
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

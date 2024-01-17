/* eslint-disable import/order */
import Header from 'Assets/Tempus-Ui/Header/Header';
import { Notifications } from 'Components/Notifications/Notifications';
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
    return (
        <>
            <Header />
            <Notifications />
            <Routes>
                <Route path={AppRoutes.DEFAULT} element={<MainPage />} />
                <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
                <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
                <Route path={AppRoutes.WRITENEWPOST} element={<WritePost />} />
                <Route path={AppRoutes.USERS} element={<AllUsers />} />
                <Route path={AppRoutes.TEAMS} element={<AllTeams />} />
                <Route
                    path={AppRoutes.CREATENEWTEAM}
                    element={<CreateTeam />}
                />
                <Route
                    path={AppRoutes.VERIFYINGEMAIL}
                    element={<VerifyingEmail />}
                />
                <Route path={AppRoutes.USER + '/:id'} element={<UserPage />} />
                <Route path={AppRoutes.POST + '/:id'} element={<PostPage />} />
                <Route path={AppRoutes.TEAM + '/:id'} element={<TeamPage />} />
                <Route
                    path={AppRoutes.FORGOTPASSWORD}
                    element={<ForgotPasswordPage />}
                />
            </Routes>
        </>
    );
}

export default App;

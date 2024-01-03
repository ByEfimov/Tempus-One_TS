/* eslint-disable import/order */
import Header from './Components/Header/Header';
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
import { Route, Routes } from 'react-router-dom';

function App() {
    const files = {};
    return (
        <>
            <Header />
            <Notifications />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/WriteNewPost" element={<WritePost />} />
                <Route path="/Users" element={<AllUsers />} />
                <Route path="/Teams" element={<AllTeams />} />
                <Route path="/CreateNewTeam" element={<CreateTeam />} />
                <Route path="/VerifyingEmail" element={<VerifyingEmail />} />
                <Route path="/User/:id" element={<UserPage />} />
                <Route path="/Post/:id" element={<PostPage />} />
                <Route path="/Team/:id" element={<TeamPage />} />
                <Route
                    path="/ForgotPasswordPage"
                    element={<ForgotPasswordPage />}
                />
            </Routes>
        </>
    );
}

export default App;

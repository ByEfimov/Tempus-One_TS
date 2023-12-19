import MainPage from 'Pages/MainPage/MainPage';
import Header from './Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import LoginPage from 'Pages/Authentication/LoginPage';
import RegisterPage from 'Pages/Authentication/RegisterPage';
import WritePost from 'Pages/WriteHewPost/WritePost';
import AllUsers from 'Pages/AllUsers/AllUsers';
import AllTeams from 'Pages/AllTeams/AllTeams';
import CreateTeam from 'Pages/CreateNewTeam/CreateTeam';
import VerifyingEmail from 'Pages/VerifiedEmail/VerifiedEmail';
import UserPage from 'Pages/OpenUser/UserPage';
import PostPage from 'Pages/OpenPost/PostPage';
import TeamPage from 'Pages/OpenTeam/TeamPage';
import ForgotPasswordPage from 'Pages/Authentication/ForgotPasswordPage';
import { Notifications } from 'Components/Notifications/Notifications';

function App() {
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

import Header from './Components/Header/Header';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
    const MainPage = lazy(() => import('./Pages/MainPage/MainPage'));
    const LoginPage = lazy(() => import('./Pages/Authentication/LoginPage'));
    const UserPage = lazy(() => import('./Pages/OpenUser/UserPage'));
    const TeamPage = lazy(() => import('./Pages/OpenTeam/TeamPage'));
    const NeedAuth = lazy(() => import('./Pages/NeedAuth/NeedAuth'));
    const AllUsers = lazy(() => import('./Pages/AllUsers/AllUsers'));
    const AllTeams = lazy(() => import('./Pages/AllTeams/AllTeams'));
    const PostPage = lazy(() => import('./Pages/OpenPost/PostPage'));
    const WriteNewPost = lazy(() => import('./Pages/WriteHewPost/WritePost'));
    const CreateNewTeam = lazy(
        () => import('./Pages/CreateNewTeam/CreateTeam')
    );
    const VerifiedingEmail = lazy(
        () => import('./Pages/VerifiedingEmail/VerifiedingEmail')
    );
    const RegisterPage = lazy(
        () => import('./Pages/Authentication/RegisterPage')
    );
    const ForgoutPasswordPage = lazy(
        () => import('./Pages/Authentication/ForgotPasswordPage')
    );

    return (
        <>
            <Suspense fallback={<h1>Загрузка</h1>}>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/NeedAuth" element={<NeedAuth />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/Register" element={<RegisterPage />} />
                    <Route path="/WriteNewPost" element={<WriteNewPost />} />
                    <Route path="/Users" element={<AllUsers />} />
                    <Route path="/Teams" element={<AllTeams />} />
                    <Route path="/CreateNewTeam" element={<CreateNewTeam />} />
                    <Route
                        path="/VerifieEmail"
                        element={<VerifiedingEmail />}
                    />
                    <Route path="/User/:id" element={<UserPage />} />
                    <Route path="/Post/:id" element={<PostPage />} />
                    <Route path="/Team/:id" element={<TeamPage />} />
                    <Route
                        path="/Forgout-Password"
                        element={<ForgoutPasswordPage />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;

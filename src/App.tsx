import Header from './Components/Header/Header';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
    const MainPage = lazy(() => import('./Pages/MainPage/MainPage'));
    const LoginPage = lazy(() => import('./Pages/Authentication/LoginPage'));
    const UserPage = lazy(() => import('./Pages/User/UserPage'));
    const NeedAuth = lazy(() => import('./Pages/NeedAuth/NeedAuth'));
    const WriteNewPost = lazy(() => import('./Pages/WriteHewPost/WritePost'));
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
                    <Route path="/User/:id" element={<UserPage />} />
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

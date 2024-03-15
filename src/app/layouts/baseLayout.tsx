import { Header, NavBar, navBarIcons } from '../assets/Tempus-Ui';
import { useAuth } from '../hooks/useAuth';
import { CreatePostPage } from '@/pages/createNewPost';
import { CreateTeamPage } from '@/pages/createNewTeam';
import { ForgotPasswordPage } from '@/pages/forgotPassword';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { MyProfilePage } from '@/pages/myProfile';
import { PostPage } from '@/pages/openPost';
import { TeamPage } from '@/pages/openTeam';
import { UserPage } from '@/pages/openUser';
import { RegisterPage } from '@/pages/register';
import { ServicesPage } from '@/pages/servicess';
import { TeamsPage } from '@/pages/teams';
import { UsersPage } from '@/pages/users';
import { VerifyingEmailPage } from '@/pages/verifiedEmail';
import AppRoutes from '@/shared/routes/app-routes';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BaseLayout() {
  const user = useAuth();

  const navBarLinksMobile = [
    {
      name: 'Главная',
      path: [AppRoutes.DEFAULT, AppRoutes.POST],
      icon: navBarIcons.Home,
    },
    {
      name: 'Сервисы',
      path: [AppRoutes.SERVICES],
      icon: navBarIcons.Services,
    },
    {
      name: 'Пользователи',
      path: [AppRoutes.USERS, AppRoutes.TEAM, AppRoutes.TEAMS, AppRoutes.USER],
      blackList: [user.pathToProfile],
      icon: navBarIcons.Users,
    },
    {
      name: 'Статистика',
      path: [AppRoutes.STATISTIC],
      icon: navBarIcons.Statistic,
    },
    {
      name: 'Профиль',
      path: [user.isAuth ? AppRoutes.MYPROFILE : AppRoutes.LOGIN, user.pathToProfile],
      icon: navBarIcons.User,
    },
  ];

  const navBarLinksDesctop = [
    {
      name: 'Главная',
      path: [AppRoutes.DEFAULT, AppRoutes.POST],
      icon: navBarIcons.Home,
    },
    {
      name: 'Сервисы',
      path: [AppRoutes.SERVICES],
      icon: navBarIcons.Services,
    },
    {
      name: 'Пользователи',
      path: [AppRoutes.USERS, AppRoutes.USER],
      blackList: [user.pathToProfile],
      icon: navBarIcons.Users,
    },
    {
      name: 'Сообщества',
      path: [AppRoutes.TEAMS, AppRoutes.TEAM],
      icon: navBarIcons.Users,
    },
    {
      name: 'Статистика',
      path: [AppRoutes.STATISTIC],
      icon: navBarIcons.Statistic,
    },
  ];

  const toastConfig = {
    autoClose: 4000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
  };

  return (
    <>
      <Header />
      <ToastContainer position="bottom-left" {...toastConfig} />
      <Routes>
        <Route path={AppRoutes.DEFAULT} element={<MainPage />} />
        <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
        <Route path={AppRoutes.VERIFYINGEMAIL} element={<VerifyingEmailPage />} />
        <Route path={AppRoutes.WRITENEWPOST} element={<CreatePostPage />} />
        <Route path={AppRoutes.CREATENEWTEAM} element={<CreateTeamPage />} />
        <Route path={AppRoutes.USERS} element={<UsersPage />} />
        <Route path={AppRoutes.TEAMS} element={<TeamsPage />} />
        <Route path={AppRoutes.SERVICES} element={<ServicesPage />} />
        <Route path={AppRoutes.MYPROFILE} element={<MyProfilePage />} />

        <Route path={AppRoutes.USER + '/:id'} element={<UserPage />} />
        <Route path={AppRoutes.POST + '/:id'} element={<PostPage />} />
        <Route path={AppRoutes.TEAM + '/:id'} element={<TeamPage />} />
        <Route path={AppRoutes.LOGIN + '/:microservice'} element={<LoginPage />} />
        <Route path={AppRoutes.REGISTER + '/:microservice'} element={<RegisterPage />} />
        <Route path={AppRoutes.FORGOTPASSWORD} element={<ForgotPasswordPage />} />
      </Routes>
      <NavBar Links={window.innerWidth > 900 ? navBarLinksDesctop : navBarLinksMobile}></NavBar>
    </>
  );
}

export default BaseLayout;

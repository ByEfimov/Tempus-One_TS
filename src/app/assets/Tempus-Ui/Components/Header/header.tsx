import { HeaderIcons, IconPositions, Input, InputTypes, defaultItem, headerIcons } from '../../index';
import Styles from './header.module.scss';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { useHeader } from '@/app/hooks/useHeader';
import { setInputSearchBar } from '@/app/slices/header/headerSlice';
import { TypesOfHeader } from '@/app/types/TypesOfData/header/header-type';
import AppRoutes from '@/shared/routes/app-routes';
import UserLogo from '@/shared/userLogo/userLogo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header = () => {
  const { HeaderTitle, HeaderSearchBar, HeaderClickBack, PlaceholderForInput, ButtonExecute, HeaderType } = useHeader();
  const user = useAuth();
  const dispatch = useAppDispatch();

  if (HeaderType === TypesOfHeader.WithoutSearchBar) {
    return (
      <motion.header initial={{ scale: 0 }} animate={{ scale: 1 }} className={Styles.Header}>
        {HeaderClickBack ? (
          <button onClick={HeaderClickBack}>
            <HeaderIcons Icon={headerIcons.Back} />
          </button>
        ) : (
          <Link to={AppRoutes.DEFAULT} className={Styles.Logo}>
            <svg width="212" height="213" viewBox="0 0 212 213" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100.865 52.6602C100.865 52.6602 120.114 201.879 5.83878 200.67C177.86 265.591 159.831 52.6602 159.831 52.6602C159.831 52.6602 202.435 60.969 211.45 0.0166016H85.305C85.305 0.0166016 -32.2421 1.19473 9.52817 140.926C9.52817 140.926 14.8537 52.6602 100.865 52.6602Z"
                fill="white"
              />
            </svg>
          </Link>
        )}
        <motion.h1 variants={defaultItem} className={Styles.Header__Title}>
          {HeaderTitle}
        </motion.h1>

        {ButtonExecute?.component ? (
          ButtonExecute.component
        ) : (
          <Link to={user.isAuth ? AppRoutes.MYPROFILE : AppRoutes.LOGIN} className={Styles.UserPhoto}>
            <UserLogo></UserLogo>
          </Link>
        )}
      </motion.header>
    );
  } else {
    return (
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={Styles.Header}>
        <motion.div className={Styles.Logo}>
          <svg width="212" height="213" viewBox="0 0 212 213" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100.865 52.6602C100.865 52.6602 120.114 201.879 5.83878 200.67C177.86 265.591 159.831 52.6602 159.831 52.6602C159.831 52.6602 202.435 60.969 211.45 0.0166016H85.305C85.305 0.0166016 -32.2421 1.19473 9.52817 140.926C9.52817 140.926 14.8537 52.6602 100.865 52.6602Z"
              fill="white"
            />
          </svg>
        </motion.div>
        <Input
          Value={HeaderSearchBar}
          Type={InputTypes.text}
          Change={(e) => {
            dispatch(setInputSearchBar({ SearchBar: e.target.value }));
          }}
          Placeholder={PlaceholderForInput}
          Icon={<HeaderIcons Icon={headerIcons.Search} />}
          IconPosition={IconPositions.right}
        ></Input>
        {ButtonExecute && (
          <motion.button onClick={() => ButtonExecute.function && ButtonExecute.function()}>
            <HeaderIcons Icon={ButtonExecute.icon}></HeaderIcons>
          </motion.button>
        )}
        <Link to={user.isAuth ? AppRoutes.MYPROFILE : AppRoutes.LOGIN} className={Styles.UserPhoto}>
          <UserLogo></UserLogo>
        </Link>
      </motion.header>
    );
  }
};
export default Header;

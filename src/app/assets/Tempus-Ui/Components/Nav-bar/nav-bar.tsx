import { NavBarIcons, navBarIcons } from '../..';
import Styles from './nav-bar.module.scss';
import { useHeader } from '@/app/hooks/useHeader';
import { Link, useLocation } from 'react-router-dom';

interface NavBar {
  Links: {
    name: string;
    path: string[];
    icon: navBarIcons;
    blackList?: string[];
  }[];
}

const NavBar = ({ Links }: NavBar) => {
  const { ShowNavBar } = useHeader();
  const location = useLocation().pathname;

  return (
    ShowNavBar && (
      <div className={Styles.Wraapper}>
        <div className={Styles.container}>
          <nav className={Styles.NavBar}>
            {Links.map((link) => (
              <Link
                key={link.path[0]}
                className={
                  (link.path.includes(location) || link.path.includes('/' + location.split('/')[1])) &&
                  !link.blackList?.includes(location)
                    ? Styles.Select
                    : undefined
                }
                to={link.path[0]}
              >
                <div className={Styles.name}>{link.name}</div>
                <NavBarIcons Icon={link.icon} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    )
  );
};

export default NavBar;

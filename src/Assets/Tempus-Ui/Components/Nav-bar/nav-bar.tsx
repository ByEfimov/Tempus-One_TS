import Styles from './nav-bar.module.scss';
import { NavBarIcons, navBarIcons } from 'Assets/Tempus-Ui';
import { useHeader } from 'Hooks/useHeader';
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
    const { ShowFooter } = useHeader();
    const location = useLocation().pathname;

    return (
        ShowFooter && (
            <nav className={Styles.NavBar}>
                {Links.map((link) => (
                    <Link
                        key={link.path[0]}
                        className={
                            (link.path.includes(location) ||
                                link.path.includes(
                                    '/' + location.split('/')[1],
                                )) &&
                            !link.blackList?.includes(location)
                                ? Styles.Select
                                : undefined
                        }
                        to={link.path[0]}
                    >
                        <NavBarIcons Icon={link.icon} />
                    </Link>
                ))}
            </nav>
        )
    );
};

export default NavBar;

import Styles from './Nav-bar.module.scss';
import FooterIcons, {
    footerIcons,
} from 'Assets/Tempus-Ui/Icons/Footer/FooterIcons';
import { useHeader } from 'Hooks/useHeader';
import { Link, useLocation } from 'react-router-dom';

interface NavBar {
    Links: { name: string; path: string; icon: footerIcons }[];
}

const NavBar = ({ Links }: NavBar) => {
    const { ShowFooter } = useHeader();
    const location = useLocation().pathname;
    const Path = location.split('/')[1];

    return (
        ShowFooter && (
            <nav className={Styles.NavBar}>
                {Links.map((link) => (
                    <Link
                        key={link.path}
                        className={
                            link.path === '/' + Path ? Styles.Select : undefined
                        }
                        to={link.path}
                    >
                        <FooterIcons Icon={link.icon} />
                    </Link>
                ))}
            </nav>
        )
    );
};

export default NavBar;

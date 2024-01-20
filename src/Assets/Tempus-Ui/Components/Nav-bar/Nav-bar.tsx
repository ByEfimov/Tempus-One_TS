import Styles from './Nav-bar.module.scss';
import FooterIcons, {
    footerIcons,
} from 'Assets/Tempus-Ui/Icons/Footer/footer-icons';
import { useHeader } from 'Hooks/useHeader';
import { Link, useLocation } from 'react-router-dom';

interface NavBar {
    Links: {
        name: string;
        path: string[];
        icon: footerIcons;
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
                        <FooterIcons Icon={link.icon} />
                    </Link>
                ))}
            </nav>
        )
    );
};

export default NavBar;

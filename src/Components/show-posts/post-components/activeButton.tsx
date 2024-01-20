import FeatherIcon from 'feather-icons-react';
import { FC } from 'react';

interface ActiveButtonProps {
    clickHandler: () => void;
    Styles: { [key: string]: string };
    Class: string;
    icon: string;
}

const ActiveButton: FC<ActiveButtonProps> = ({
    clickHandler,
    Styles,
    Class,
    icon,
}) => {
    return (
        <button onClick={clickHandler} className={Class}>
            <FeatherIcon icon={icon} className={Styles.Img} />
        </button>
    );
};
export default ActiveButton;

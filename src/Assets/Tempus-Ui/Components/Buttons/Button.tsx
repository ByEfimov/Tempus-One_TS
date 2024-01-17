import Styles from './Button.module.scss';
import classNames from 'classnames';

export enum ButtonTypes {
    active = 'active',
    default = 'default',
    error = 'error',
}

interface Button {
    Title: string;
    Click: () => void;
    Type: ButtonTypes;
    Icon?: string;
}

const Button = ({ Title, Click, Type, Icon }: Button) => {
    const moreStyleOfButton =
        Type === ButtonTypes.active
            ? Styles.ButtonActive
            : Type === ButtonTypes.error
            ? Styles.ButtonError
            : undefined;

    return (
        <button
            className={classNames(Styles.Button, moreStyleOfButton)}
            onClick={() => {
                Click();
            }}
            type="submit"
        >
            <img src={Icon} alt="" />
            {Title}
        </button>
    );
};
export default Button;

import Styles from './Input.module.scss';

export enum InputTypes {
    text = 'text',
    number = 'number',
    password = 'password',
    email = 'email',
    phone = 'phone',
}

interface Input {
    Placeholder: string;
    Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Value: string | number;
    DefaultValue?: string;
    Icon?: string;
    MaxLength?: number;
    Type: InputTypes;
}

const Input = ({
    Placeholder,
    Change,
    Value,
    DefaultValue,
    Icon,
    MaxLength,
    Type,
}: Input) => {
    return (
        <div className={Styles.Input}>
            <div className={Styles.Input__Icon}>
                <img src={Icon} alt="" />
            </div>
            <input
                maxLength={MaxLength}
                type={Type}
                onChange={(e) => Change(e)}
                defaultValue={DefaultValue}
                value={Value}
                placeholder={Placeholder}
            ></input>
        </div>
    );
};

export default Input;

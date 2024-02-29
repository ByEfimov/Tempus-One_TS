import Styles from './input.module.scss';
import { formItemType } from '@/app/assets/Tempus-Ui';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export enum InputTypes {
  text = 'text',
  number = 'number',
  password = 'password',
  email = 'email',
  phone = 'phone',
}

export enum IconPositions {
  left = 'left',
  right = 'right',
}

export enum InputColors {
  default = 'default',
  primary = 'primary',
}

interface InputProps {
  Placeholder: string;
  Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Value?: string | number;
  DefaultValue?: string;
  Icon?: ReactNode;
  MaxLength?: number;
  Type: InputTypes;
  Variants?: formItemType;
  IconPosition?: IconPositions;
  Color?: InputColors;
  Name?: string;
}

const Input = ({
  Placeholder,
  Change,
  Value,
  DefaultValue,
  Icon,
  MaxLength,
  Type,
  Variants,
  IconPosition,
  Color = InputColors.default,
  Name,
}: InputProps) => {
  return (
    <motion.div
      variants={Variants}
      className={classNames(Styles.Input, Color === InputColors.primary && Styles.primary)}
    >
      {Icon && IconPosition === IconPositions.left && <div className={Styles.Input__Icon}>{Icon}</div>}
      <input
        name={Name}
        maxLength={MaxLength}
        type={Type}
        onChange={(e) => Change(e)}
        defaultValue={DefaultValue}
        value={Value}
        placeholder={Placeholder}
      />
    </motion.div>
  );
};

export default Input;

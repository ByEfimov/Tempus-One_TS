import { formItemType } from '../..';
import { InputColors } from './input';
import Styles from './input.module.scss';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface TextArea {
  Placeholder: string;
  Change: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  Value: string | number;
  DefaultValue?: string;
  MaxLength?: number;
  Variants?: formItemType;
  Color?: InputColors;
  Name?: string;
}

const TextArea = ({ Placeholder, Change, Value, DefaultValue, MaxLength, Variants, Color, Name }: TextArea) => {
  return (
    <motion.div
      variants={Variants}
      className={classNames(Styles.Input, Color === InputColors.primary && Styles.primary)}
    >
      <textarea
        maxLength={MaxLength}
        onChange={(e) => Change(e)}
        defaultValue={DefaultValue}
        value={Value}
        placeholder={Placeholder}
        name={Name}
      ></textarea>
    </motion.div>
  );
};

export default TextArea;

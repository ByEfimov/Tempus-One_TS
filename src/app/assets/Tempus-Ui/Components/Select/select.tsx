import { InputColors, defaultContainer, defaultItem, formItem } from '../..';
import Styles from './select.module.scss';
import { Select as AntdSelect, ConfigProvider } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';

export enum SelectTypes {
  Row = 'Row',
  Input = 'Input',
}

const Select = ({
  Array,
  setSelect,
  Select,
  Type,
  Placeholder,
  Color = InputColors.default,
  DefaultValue,
}: {
  Array?: { label: string; value: string }[];
  setSelect: ((value: string) => void) | React.Dispatch<React.SetStateAction<string>>;
  Select?: string;
  Type: SelectTypes;
  Placeholder?: string;
  Color?: InputColors;
  DefaultValue?: string;
}) => {
  if (Type === SelectTypes.Row) {
    return (
      <motion.div {...defaultContainer} className={Styles.Select}>
        {Array?.map((item) => (
          <motion.button
            key={item.value}
            variants={defaultItem}
            onClick={() => setSelect(item.value)}
            className={classNames(Styles.Item, Select === item.value && Styles.Selected)}
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    );
  } else if (Type === SelectTypes.Input) {
    return (
      <motion.div
        variants={formItem}
        className={classNames(Styles.SelectInput, Color === InputColors.primary && 'Primary')}
      >
        <ConfigProvider
          theme={{
            components: {
              Select: {
                borderRadius: 10,
                colorBgContainer:
                  Color === InputColors.primary ? 'var(--PrimaryBackgroundColor)' : 'var(--SecondaryBackgroundColor)',
                colorBorder: 'none',
                controlOutlineWidth: 1,
                controlOutline: 'var(--AccentBorderColor)',
                controlItemBgActive: 'var(--TransparentColor)',
                colorBgElevated:
                  Color === InputColors.primary ? 'var(--PrimaryBackgroundColor)' : 'var(--SecondaryBackgroundColor)',
                colorText: 'var(--PrimaryTextColor)',
                colorTextPlaceholder: 'var(--SecondaryTextColor)',
                zIndexPopup: 9999999,
              },
            },
          }}
        >
          <AntdSelect
            placeholder={Placeholder}
            className={Styles.SelectInput}
            onChange={(value: string) => setSelect(value)}
            options={Array}
            defaultValue={DefaultValue}
          />
        </ConfigProvider>
      </motion.div>
    );
  }
};
export default Select;

import { formItem } from '../..';
import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const Datepicker = ({ Callback, Default }: { Callback: (date: string | string[]) => void; Default: dayjs.Dayjs }) => {
  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    Callback(dateString);
  };

  return (
    <motion.div variants={formItem} style={{ width: '100%' }}>
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              borderRadius: 10,
              colorBgContainer: 'var(--PrimaryBackgroundColor)',
              colorBorder: 'none',
              controlOutlineWidth: 1,
              controlOutline: 'var(--AccentBorderColor)',
              controlItemBgActive: 'var(--TransparentColor)',
              colorBgElevated: 'var(--PrimaryBackgroundColor)',
              colorText: 'var(--PrimaryTextColor)',
              colorTextPlaceholder: 'var(--SecondaryTextColor)',
              zIndexPopup: 999999999999,
              colorBorderSecondary: 'var(--TransparentColor);',
              colorBorderBg: 'var(--TransparentColor);',
            },
          },
        }}
      >
        <DatePicker
          defaultValue={Default}
          locale={locale}
          style={{
            height: 45,
            fontWeight: 400,
            width: '100%',
            fontSize: 16,
            border: '1px solid var(--TransparentColor)',
          }}
          onChange={onChange}
        />
      </ConfigProvider>
    </motion.div>
  );
};
export default Datepicker;

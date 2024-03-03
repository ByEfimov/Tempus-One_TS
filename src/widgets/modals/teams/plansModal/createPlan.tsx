import Styles from './styles.module.scss';
import {
  DatePicker,
  HeaderIcons,
  Input,
  InputColors,
  InputTypes,
  Select,
  SelectTypes,
  TextArea,
  formContainer,
  formItem,
  headerIcons,
} from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { UserType } from '@/app/slices/userSlice';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { getUsersFromIdArray } from '@/features/api/Users/getUsersFromIdArray';
import { postRequestWithNewId } from '@/features/api/requests/post-requests-with-new-id';
import { countEmptyValues } from '@/shared/validate-data/countEmptyValues';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';

export type Plan = {
  date: string | string[];
  title: string;
  desc: string;
  asigner: string;
  type: string;
};

const currentDate = moment().format('YYYY-MM-DD');
const currentDateDayJs = dayjs();

export const planTypes = ['feature', 'bug', 'improvement'];

const CreatePlan = ({
  setSelectCreate,
  OpenTeam,
}: {
  setSelectCreate: React.Dispatch<React.SetStateAction<boolean>>;
  OpenTeam: OpenTeamType;
}) => {
  const { UserId } = useAuth();
  const [teamCreators, setTeamCreators] = useState<UserType[]>();

  useEffect(() => {
    function getTeamCreators() {
      const teamCreatorsIds = Object.values(OpenTeam.members).filter(
        (user) => user.UserRole === 'Administrator' || user.UserRole === 'creator',
      );

      getUsersFromIdArray(teamCreatorsIds).then((creators) => setTeamCreators(creators));
    }

    getTeamCreators();
  }, []);

  const [form, setForm] = useState<Plan>({
    date: currentDate,
    title: '',
    desc: '',
    asigner: UserId,
    type: planTypes[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createPlan = () => {
    if (countEmptyValues(form) === 0) {
      postRequestWithNewId(`teams/${OpenTeam.id}/plans/`, form);
      setSelectCreate(false);
    }
  };

  return (
    <motion.form {...formContainer} className={Styles.createPlan}>
      <motion.div variants={formItem} className={Styles.Title}>
        Добавить план
        <motion.div className={Styles.Buttons} {...formContainer}>
          <motion.button
            variants={formItem}
            onClick={(e) => {
              e.preventDefault();
              setSelectCreate(false);
            }}
          >
            <HeaderIcons Icon={headerIcons.Back} />
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              createPlan();
            }}
            variants={formItem}
          >
            <HeaderIcons Icon={headerIcons.Add} />
          </motion.button>
        </motion.div>
      </motion.div>
      <Input
        Variants={formItem}
        Placeholder="Заголовок"
        Change={handleChange}
        Type={InputTypes.text}
        Name="title"
        Value={form.title}
        Color={InputColors.primary}
      />
      <TextArea
        Variants={formItem}
        Placeholder="Описание"
        Change={handleChange}
        Value={form.desc}
        Name="desc"
        Color={InputColors.primary}
      />
      <motion.div className={Styles.row} {...formContainer}>
        <DatePicker
          Default={currentDateDayJs}
          Callback={(date: string | string[]) => {
            setForm({
              ...form,
              date: date,
            });
          }}
        />
        <Select
          Type={SelectTypes.Input}
          setSelect={(value: string) => {
            setForm({
              ...form,
              asigner: value,
            });
          }}
          Color={InputColors.primary}
          DefaultValue={form.asigner}
          Placeholder="Выполняющий"
          Array={teamCreators?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        ></Select>
        <Select
          Type={SelectTypes.Input}
          setSelect={(value: string) => {
            setForm({
              ...form,
              type: value,
            });
          }}
          Color={InputColors.primary}
          Placeholder="Тип задачи"
          DefaultValue={form.type}
          Array={planTypes?.map((item) => ({
            label: item,
            value: item,
          }))}
        ></Select>
      </motion.div>
    </motion.form>
  );
};
export default CreatePlan;

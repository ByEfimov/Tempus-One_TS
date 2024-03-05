import { Plan } from './createPlan';
import Styles from './styles.module.scss';
import { ButtonIcons, TeamIcons, buttonIcons, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { subcribeOnData } from '@/features/api/requests/subscribeOnData';
import AppRoutes from '@/shared/routes/app-routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RenderPlans = ({
  setSelectCreate,
  OpenTeam,
  userAdmin,
}: {
  setSelectCreate: React.Dispatch<React.SetStateAction<boolean>>;
  userAdmin: boolean;
  OpenTeam: OpenTeamType;
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    subcribeOnData(`teams/${OpenTeam.id}/plans`).then((plansGet) => {
      setPlans(plansGet);
    });
  }, []);

  const groupedByDate = Object.fromEntries(
    Object.entries(
      plans.reduce(
        (acc, plan) => {
          const dates = typeof plan.date === 'string' ? [plan.date] : plan.date;
          dates.forEach((date) => {
            acc[date] = [...(acc[date] || []), plan];
          });
          return acc;
        },
        {} as { [key: string]: Plan[] },
      ),
    ).sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()),
  );

  return (
    <motion.div {...formContainer} className={Styles.container}>
      {userAdmin && (
        <motion.div
          variants={formItem}
          className={Styles.TitleC}
          onClick={() => {
            setSelectCreate(true);
          }}
        >
          Добавить план <ButtonIcons Icon={buttonIcons.Arrow}></ButtonIcons>
        </motion.div>
      )}
      <motion.div className={Styles.Plans} {...formContainer}>
        {Object.entries(groupedByDate).map(([date, plans]) => (
          <motion.div variants={formItem} className={Styles.GroupDate} key={date}>
            <h4>{date}</h4>
            {plans.map((plan) => (
              <RenderPlan plan={plan} key={plan.id} />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const RenderPlan = ({ plan }: { plan: Plan }) => {
  const navigate = useNavigate();
  return (
    <motion.div className={Styles.Plan}>
      <motion.div className={Styles.Type}>
        <TeamIcons Icon={plan.type} />
      </motion.div>
      <motion.div className={Styles.Text}>
        <div className={Styles.Title}>{plan.title}</div>
        <div className={Styles.Desc}>{plan.desc}</div>
      </motion.div>
      <motion.div className={Styles.Buttons}>
        <motion.button className={Styles.Reduct}>
          <ButtonIcons Icon={buttonIcons.Settings} />
        </motion.button>
        <motion.button
          className={Styles.Asigner}
          onClick={() => {
            navigate(AppRoutes.USER + '/' + plan.asigner?.id);
          }}
        >
          <img src={plan.asigner?.photo || ''} alt="" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RenderPlans;

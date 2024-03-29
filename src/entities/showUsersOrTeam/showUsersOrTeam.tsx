import SubscribeButton from '../../features/subscribeButton/SubscribeButton';
import Styles from './styles.module.scss';
import { formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { OpenUserType } from '@/app/types/TypesOfData/team-or-user/open-user-type';
import AppRoutes from '@/shared/routes/app-routes';
import UserLogo from '@/shared/userLogo/userLogo';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ShowUserOrTeam({ Team, User }: { Team?: OpenTeamType; User?: OpenUserType | null }) {
  const navigate = useNavigate();

  if (User) {
    return (
      <motion.li variants={formItem} className={Styles.Obj} onClick={() => navigate(AppRoutes.USER + '/' + User.id)}>
        <div className={Styles.Data}>
          <div className={Styles.Photo}>
            <UserLogo Logo={User.photo} />
          </div>
          <div className={Styles.Text}>
            <div className={Styles.Title}>{User.name}</div>
            <div className={Styles.Members}>
              {(User.members && Object.values(User?.members).length) || 0} подписчиков
            </div>
          </div>
        </div>
        <div className={Styles.Activity}>
          <SubscribeButton WhoWrotePost={User} id={User.id}></SubscribeButton>
        </div>
      </motion.li>
    );
  } else if (Team) {
    return (
      <motion.li variants={formItem} className={Styles.Obj} onClick={() => navigate(AppRoutes.TEAM + '/' + Team.id)}>
        <div className={Styles.Data}>
          <div className={Styles.Photo}>
            <UserLogo Logo={Team.image} />
          </div>
          <div className={Styles.Text}>
            <div className={Styles.Title}>{Team.title}</div>
            <div className={Styles.Members}>
              {(Team.members && Object.values(Team.members).length) || 0} подписчиков
            </div>
          </div>
        </div>
        <div className={Styles.Activity}>
          <SubscribeButton WhoWrotePost={Team} id={Team.id}></SubscribeButton>
        </div>
      </motion.li>
    );
  }
}

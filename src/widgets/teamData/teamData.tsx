import Styles from './styles.module.scss';
import TeamInfo from './teamInfo';
import { Button, ButtonTypes, formContainer, formItem } from '@/Assets/Tempus-Ui';
import { OpenTeamType } from '@/Types/TypesOfData/team-or-user/open-team-type';
import MaxXpToNextLevel from '@/Utils/users-or-teams/max-xp-to-next-level';
import { motion } from 'framer-motion';

interface CustomCSSProperties extends React.CSSProperties {
  '--progress-value'?: number;
}

export default function TeamData({
  OpenTeam,
  UserAdmin,
  setSettingsModalOpen,
  setInfoModalOpen,
}: {
  OpenTeam: OpenTeamType;
  UserAdmin: boolean;
  setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const progressValue =
    OpenTeam.experience && Math.round((OpenTeam.experience / MaxXpToNextLevel(OpenTeam.level || 0)) * 100);

  return (
    <motion.div className={Styles.UserData} variants={formItem}>
      <motion.div {...formContainer} className={Styles.TopBar}>
        <div className={Styles.UserPhoto}>
          <img className={OpenTeam.image ? Styles.Photo : Styles.Fake} src={OpenTeam.image} alt="UserPhoto" />
        </div>

        <div
          className="progress-bar css"
          style={
            {
              '--progress-value': progressValue,
            } as CustomCSSProperties
          }
        >
          <progress id="css" max={MaxXpToNextLevel(OpenTeam.level || 0)} value={OpenTeam.experience || 0}></progress>
        </div>
      </motion.div>

      <motion.ul {...formContainer} className={Styles.UserTexts}>
        <motion.li variants={formItem} className={Styles.UserName}>
          {OpenTeam.title}
        </motion.li>
        <motion.li variants={formItem} className={Styles.UserEmail}>
          {OpenTeam.direction || Object.values(OpenTeam.members || '').length + ' подписчиков'}
        </motion.li>
        <motion.li variants={formItem} className={Styles.UserLevel}>
          {OpenTeam.level || 1} уровень
        </motion.li>
        <TeamInfo setInfoModalOpen={setInfoModalOpen} OpenTeam={OpenTeam}></TeamInfo>
        {UserAdmin && (
          <Button
            Click={() => {
              setSettingsModalOpen(true);
            }}
            Variants={formItem}
            Title="Настройки"
            Class={Styles.buttonSettings}
            Type={ButtonTypes.default}
          />
        )}
      </motion.ul>
    </motion.div>
  );
}

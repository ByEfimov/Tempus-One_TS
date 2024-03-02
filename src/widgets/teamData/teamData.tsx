import Styles from './styles.module.scss';
import TeamInfo from './teamInfo';
import { Button, ButtonTypes, formContainer, formItem } from '@/app/assets/Tempus-Ui';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import { UserLogoWithXp } from '@/shared/userLogo/userLogoWithXp';
import { motion } from 'framer-motion';

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
  return (
    <>
      <motion.div className={Styles.UserData} variants={formItem}>
        <UserLogoWithXp OpenUser={OpenTeam}></UserLogoWithXp>
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
          {window.innerWidth < 900 && <TeamInfo setInfoModalOpen={setInfoModalOpen} OpenTeam={OpenTeam}></TeamInfo>}
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
    </>
  );
}

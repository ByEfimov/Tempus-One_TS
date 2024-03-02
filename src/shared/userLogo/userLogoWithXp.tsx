import MaxXpToNextLevel from '../users-or-teams/max-xp-to-next-level';
import Styles from './styles.module.scss';
import UserLogo from './userLogo';
import { defaultItem } from '@/app/assets/Tempus-Ui';
import { getRequestObject } from '@/features/api/requests/get-requests';
import StatusModal from '@/widgets/statusModal/modal';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type statusType = {
  desc: string;
  id: string;
  name: string;
  image: string;
};

interface CustomCSSProperties extends React.CSSProperties {
  '--progress-value'?: number;
}

const UserLogoWithXp = ({
  OpenUser,
}: {
  OpenUser: { experience: number | null; level: number | null; status?: string; photo?: string | null; image?: string };
}) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<statusType | null>(null);
  const [progressValue, setProgressValue] = useState<number | null>(0);

  useEffect(() => {
    if (OpenUser.status) {
      getRequestObject('achievements/' + (OpenUser.status || '')).then((achive) => setUserStatus(achive));
    } else {
      setUserStatus(null);
    }

    setProgressValue(
      OpenUser.experience && Math.round((OpenUser.experience / MaxXpToNextLevel(OpenUser.level || 0)) * 100),
    );
  }, [OpenUser]);

  return (
    <motion.div className={Styles.TopBar}>
      {statusModalOpen && <StatusModal status={userStatus} setModalOpen={setStatusModalOpen}></StatusModal>}
      {userStatus && (
        <motion.div
          variants={defaultItem}
          className={Styles.UserStatus}
          onClick={() => {
            setStatusModalOpen(true);
          }}
        >
          <img src={userStatus?.image} alt="" />
        </motion.div>
      )}
      <div className={Styles.UserPhoto}>
        <UserLogo Logo={OpenUser.photo || OpenUser.image} />
      </div>

      <div
        className="progress-bar css"
        style={
          {
            '--progress-value': progressValue,
          } as CustomCSSProperties
        }
      >
        <progress id="css" max={MaxXpToNextLevel(OpenUser.level || 0)} value={OpenUser.experience || 0}></progress>
      </div>
    </motion.div>
  );
};

export { UserLogoWithXp };

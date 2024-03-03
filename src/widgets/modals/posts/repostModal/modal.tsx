import Styles from './styles.module.scss';
import { defaultContainer, defaultItem } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import { PostType } from '@/app/slices/witePost/writePostSlice';
import getUserAdmins from '@/features/api/Teams/get-user-admins';
import { repostToYou } from '@/features/api/Users/posts/RepostToYou';
import { IsModal } from '@/shared/modals/isModal';
import UserLogo from '@/shared/userLogo/userLogo';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RepostModal {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
}

const RepostModal = ({ setModalOpen, post }: RepostModal) => {
  const { UserPhoto, UserId, UserIsAuth } = useAuth();
  const [teamsAdmin, setTeamsAdmin] = useState<{ label: string; value: string; image?: string }[] | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    getUserAdmins(UserId).then((teams) => setTeamsAdmin(teams));
  }, []);

  const repostConfig = {
    post,
    UserIsAuth,
    UserId,
    navigate,
  };

  return (
    <IsModal setModalOpen={setModalOpen}>
      <motion.div {...defaultContainer} className={Styles.RepostModal}>
        <motion.button variants={defaultItem} onClick={() => repostToYou(repostConfig)} className={Styles.RepostToYou}>
          <UserLogo Logo={UserPhoto}></UserLogo>
          <p className={Styles.name}>Себе</p>
        </motion.button>
        {teamsAdmin &&
          teamsAdmin.map((team) => (
            <motion.button
              variants={defaultItem}
              key={team.value}
              onClick={() => repostToYou(repostConfig)}
              className={Styles.RepostToTeam}
            >
              <UserLogo Logo={team.image}></UserLogo>
              <p className={Styles.name}>{team.label}</p>
            </motion.button>
          ))}
      </motion.div>
    </IsModal>
  );
};

export default RepostModal;

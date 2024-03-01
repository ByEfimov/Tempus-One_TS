import TeamModals from './modals';
import Styles from './styles.module.scss';
import { Preloader } from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { setExecuteButton } from '@/app/slices/header/headerSlice';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import ShowPosts from '@/entities/post/showPosts';
import getUserAdmins from '@/features/api/Teams/get-user-admins';
import { getRequestObject } from '@/features/api/requests/get-requests';
import SubscribeButton from '@/features/subscribeButton/SubscribeButton';
import TeamData from '@/widgets/teamData/teamData';
import TeamInfo from '@/widgets/teamData/teamInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function TeamPage() {
  const { id } = useParams();
  const { UserId } = useAuth();
  const [openTeam, setOpenTeam] = useState<OpenTeamType>();
  const [isUserAdmin, setUserAdmin] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getRequestObject('teams/' + id)
      .then((team) => {
        setOpenTeam(team);
        getUserAdmins(UserId).then((teams) => {
          setUserAdmin(teams.some((team) => team.value === id));
        });
      })
      .catch(() => toast.error('Сообщество не найдено.'));
  }, []);

  useEffect(() => {
    dispatch(
      setExecuteButton({
        button: {
          component: <SubscribeButton WhoWrotePost={openTeam} id={openTeam?.id} />,
        },
      }),
    );
  }, [openTeam]);

  if (openTeam) {
    return (
      <>
        <TeamModals
          setSettingsModalOpen={setSettingsModalOpen}
          OpenTeam={openTeam}
          setInfoModalOpen={setInfoModalOpen}
          infoModalOpen={infoModalOpen}
          settingsModalOpen={settingsModalOpen}
        />

        <div className={Styles.TeamData}>
          <TeamData
            setInfoModalOpen={setInfoModalOpen}
            setSettingsModalOpen={setSettingsModalOpen}
            UserAdmin={isUserAdmin}
            OpenTeam={openTeam}
          />
          {window.innerWidth >= 900 && <TeamInfo setInfoModalOpen={setInfoModalOpen} OpenTeam={openTeam}></TeamInfo>}
        </div>
        <div className={Styles.TeamPosts}>
          <ShowPosts ShowTitle AuthorFilter={openTeam.id} />
        </div>
      </>
    );
  } else if (!openTeam) {
    return <Preloader></Preloader>;
  }
}

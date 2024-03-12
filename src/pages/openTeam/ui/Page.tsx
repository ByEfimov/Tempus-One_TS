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
  const user = useAuth();
  const [openTeam, setOpenTeam] = useState<OpenTeamType>();
  const [isUserAdmin, setUserAdmin] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [plansModalOpen, setPlansModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getRequestObject('teams/' + id)
      .then((team) => {
        setOpenTeam(team);
      })
      .catch(() => toast.error('Сообщество не найдено.'));

    getUserAdmins(user.id).then((teams) => {
      setUserAdmin(teams.some((team) => team.value === id));
    });
  }, [id]);

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
          plansModalOpen={plansModalOpen}
          setPlansModalOpen={setPlansModalOpen}
          setSettingsModalOpen={setSettingsModalOpen}
          OpenTeam={openTeam}
          setInfoModalOpen={setInfoModalOpen}
          infoModalOpen={infoModalOpen}
          settingsModalOpen={settingsModalOpen}
          UserAdmin={isUserAdmin}
        />

        <div className={Styles.TeamData}>
          <TeamData
            setPlansModalOpen={setPlansModalOpen}
            setInfoModalOpen={setInfoModalOpen}
            setSettingsModalOpen={setSettingsModalOpen}
            UserAdmin={isUserAdmin}
            OpenTeam={openTeam}
          />
          {window.innerWidth >= 900 && (
            <TeamInfo setPlansModalOpen={setPlansModalOpen} setInfoModalOpen={setInfoModalOpen} OpenTeam={openTeam} />
          )}
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

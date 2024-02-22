import TeamModals from './modals';
import getUserAdmins from '@/app/api/Teams/get-user-admins';
import { getRequestObject } from '@/app/api/requests/get-requests';
import { Preloader } from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { setExecuteButton } from '@/app/slices/header/header-slice';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import ShowPosts from '@/entities/post/showPosts';
import { ErrorNotification } from '@/features/notifications/notifications';
import SubscribeButton from '@/features/subscribeButton/SubscribeButton';
import TeamData from '@/widgets/teamData/teamData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      .catch(() => ErrorNotification('Сообщество не найдено.'));
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
        <TeamData
          setInfoModalOpen={setInfoModalOpen}
          setSettingsModalOpen={setSettingsModalOpen}
          UserAdmin={isUserAdmin}
          OpenTeam={openTeam}
        />
        <div style={{ marginLeft: 80 }}>
          <ShowPosts ShowTitle AuthorFilter={openTeam.id} />
        </div>
      </>
    );
  } else if (!openTeam) {
    return <Preloader></Preloader>;
  }
}

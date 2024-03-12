import { createNewTeam } from '../api/createNewTeam';
import CreateNewTeamForm from './form';
import { Button, ButtonTypes, formItem } from '@/app/assets/Tempus-Ui';
import { useAuth } from '@/app/hooks/useAuth';
import AppRoutes from '@/shared/routes/app-routes';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export type NewTeamType = {
  title: string;
  image: string;
  direction: string;
  creators: string;
  descriprion: string;
  members: Record<string, { UserId: string; UserRole: string }>;
};

const CreateTeamPage = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [newTeam, setNewTeam] = useState<NewTeamType>({
    title: '',
    descriprion: '',
    image: '',
    direction: '',
    creators: '',
    members: {
      [user.id]: { UserId: user.id, UserRole: 'Administrator' },
    },
  });

  if (!user.canChanging) {
    return <Navigate to={AppRoutes.TEAMS} />;
  }
  return (
    <CreateNewTeamForm newTeam={newTeam} setNewTeam={setNewTeam}>
      <Button
        Click={() => createNewTeam(newTeam, navigate)}
        Type={ButtonTypes.active}
        Title="Создать команду"
        Variants={formItem}
      />
    </CreateNewTeamForm>
  );
};

export { CreateTeamPage };

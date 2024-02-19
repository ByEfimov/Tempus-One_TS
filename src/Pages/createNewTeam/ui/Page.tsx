import { createNewTeam } from '../api/createNewTeam';
import CreateNewTeamForm from './form';
import Styles from './styles.module.scss';
import { Button, ButtonTypes, formItem } from '@/Assets/Tempus-Ui';
import { useAuth } from '@/Hooks/useAuth';
import AppRoutes from '@/Utils/routes/app-routes';
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
    const { UserCanChanging, UserId, UserExperience } = useAuth();
    const navigate = useNavigate();
    const [newTeam, setNewTeam] = useState<NewTeamType>({
        title: '',
        descriprion: '',
        image: '',
        direction: '',
        creators: '',
        members: {
            [UserId]: { UserId: UserId, UserRole: 'Administrator' },
        },
    });

    if (UserCanChanging) {
        return (
            <div className={Styles.Container}>
                <CreateNewTeamForm newTeam={newTeam} setNewTeam={setNewTeam}>
                    <Button
                        Click={() =>
                            createNewTeam(
                                newTeam,
                                UserId,
                                UserExperience,
                                navigate,
                            )
                        }
                        Type={ButtonTypes.active}
                        Title="Создать команду"
                        Variants={formItem}
                    />
                </CreateNewTeamForm>
            </div>
        );
    } else if (!UserCanChanging) {
        return <Navigate to={AppRoutes.TEAMS} />;
    }
};

export { CreateTeamPage };

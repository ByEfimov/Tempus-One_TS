import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpenTeamType } from '../OpenTeam/TeamPage';
import { getAllTeams } from '../../Api/Teams/getAllTeams';
import ButtonVoid from '../../Components/minicops/B-void';

export default function AllTeams() {
    const [teams, setTeams] = useState<OpenTeamType[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeams().then((teams) => setTeams(teams));
    }, []);

    return (
        <div
            style={{
                marginTop: 60,
                padding: 20,
                display: 'flex',
                gap: 10,
                flexDirection: 'column',
            }}
        >
            <ButtonVoid
                title="Добавить команду"
                clickHandler={() => navigate('/createNewTeam')}
            ></ButtonVoid>

            {teams && (
                <div>
                    {teams.map((team) => (
                        <div
                            key={team.id}
                            onClick={() => navigate('/Team/' + team.id)}
                        >
                            {team.title} {team.desc}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

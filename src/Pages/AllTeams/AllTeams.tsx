import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpenTeamType } from 'Pages/OpenTeam/TeamPage';
import { getAllTeams } from 'Api/Teams/getAllTeams';
import ButtonVoid from 'Components/MiniComponents/button';
import PreloaderUsers from 'Components/MiniComponents/PreloaderUsers';
import Styles from './Styles.module.scss';
import ShowUserOrTeam from 'Components/ShowPosts/ShowUsersOrTeam/ShowUsersOrTeam';

export default function AllTeams() {
    const [teams, setTeams] = useState<OpenTeamType[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeams().then((teams) => setTeams(teams));
    }, []);

    return (
        <div className={Styles.Teams}>
            <ButtonVoid
                title="Добавить "
                clickHandler={() => navigate('/createNewTeam')}
            ></ButtonVoid>

            {teams ? (
                <div>
                    {teams.map((team) => (
                        <ShowUserOrTeam
                            key={team.id}
                            Team={team}
                        ></ShowUserOrTeam>
                    ))}
                </div>
            ) : (
                <PreloaderUsers></PreloaderUsers>
            )}
        </div>
    );
}

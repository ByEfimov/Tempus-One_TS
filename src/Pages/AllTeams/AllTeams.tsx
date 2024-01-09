import Styles from './Styles.module.scss';
import { getAllTeams } from 'Api/Teams/getAllTeams';
import PreloaderUsers from 'Components/MiniComponents/PreloaderUsers';
import ButtonVoid from 'Components/MiniComponents/button';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import ShowUserOrTeam from 'Components/ShowPosts/PostComponents/ShowUsersOrTeam/ShowUsersOrTeam';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllTeams() {
    const [teams, setTeams] = useState<OpenTeamType[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeams()
            .then((teams) => setTeams(teams))
            .catch(() => ErrorNotification('Сообщества не найдены.'));
    }, []);

    return (
        <div className={Styles.Teams}>
            <ButtonVoid
                title="Добавить"
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

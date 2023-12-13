import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OpenTeamType } from '../OpenTeam/TeamPage';
import { getAllTeams } from '../../Api/Teams/getAllTeams';
import ButtonVoid from '../../Components/minicops/buton';
import {
    TypesOfHeader,
    setHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import PreloaderUsers from '../../Components/minicops/PreloaderUsers';
import Styles from './Styles.module.scss';
import PlussIcon from '../../Assets/Icons/Post/plus-circle.svg';

export default function AllTeams() {
    const [teams, setTeams] = useState<OpenTeamType[] | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTeams().then((teams) => setTeams(teams));
        dispatch(
            setHeader({ Title: 'Группы', Type: TypesOfHeader.WithSearchBar })
        );
    }, []);

    return (
        <div className={Styles.Teams}>
            <ButtonVoid
                title="Добавить команду"
                clickHandler={() => navigate('/createNewTeam')}
            ></ButtonVoid>

            {teams ? (
                <div>
                    {teams.map((team) => (
                        <div
                            className={Styles.Team}
                            key={team.id}
                            onClick={() => navigate('/Team/' + team.id)}
                        >
                            <div className={Styles.Data}>
                                <div className={Styles.Photo}>
                                    <img src={team.image} alt="" />
                                </div>
                                <div className={Styles.Text}>
                                    <div className={Styles.Title}>
                                        {team.title}
                                    </div>
                                    <div className={Styles.Members}>
                                        {Object.values(team.teamMembers).length}{' '}
                                        подписчиков
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.Activity}>
                                <button className={Styles.SubButton}>
                                    <img src={PlussIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <PreloaderUsers></PreloaderUsers>
            )}
        </div>
    );
}

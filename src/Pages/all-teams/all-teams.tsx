import Styles from './Styles.module.scss';
import { getRequestArray } from 'Api/requests/get-requests';
import { defaultContainer } from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import ShowUserOrTeam from 'Components/show-users-or-team/show-users-or-team';
import { useHeader } from 'Hooks/useHeader';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { filterTeams } from 'Utils/filters/filter-users';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AllTeams() {
    const [teams, setTeams] = useState<OpenTeamType[] | null>(null);
    const { HeaderSearchBar } = useHeader();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getRequestArray('teams/').then((teams) => {
                const filteredTeams = filterTeams(HeaderSearchBar, teams);
                setTeams(filteredTeams);
            });
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [HeaderSearchBar]);

    return (
        <motion.ul
            initial="hidden"
            animate="visible"
            variants={defaultContainer}
            className={Styles.Teams}
        >
            {teams ? (
                teams.map((team) => (
                    <ShowUserOrTeam key={team.id} Team={team}></ShowUserOrTeam>
                ))
            ) : (
                <Preloader></Preloader>
            )}
        </motion.ul>
    );
}

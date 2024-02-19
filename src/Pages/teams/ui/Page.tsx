import { getFilteredTeams } from '../api/getFilteredTeams';
import Styles from './styles.module.scss';
import { Preloader, defaultContainer } from '@/Assets/Tempus-Ui';
import ShowUserOrTeam from '@/Components/show-users-or-team/show-users-or-team';
import { useHeader } from '@/Hooks/useHeader';
import { OpenTeamType } from '@/Types/TypesOfData/team-or-user/open-team-type';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function TeamsPage() {
    const [teams, setTeams] = useState<OpenTeamType[]>();
    const { HeaderSearchBar } = useHeader();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getFilteredTeams(HeaderSearchBar, setTeams, teams);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [HeaderSearchBar]);

    return (
        <motion.ul {...defaultContainer} className={Styles.Teams}>
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

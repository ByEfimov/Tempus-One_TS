import { getFilteredTeams } from '../api/getFilteredTeams';
import Styles from './styles.module.scss';
import { Preloader, defaultContainer } from '@/app/assets/Tempus-Ui';
import { useHeader } from '@/app/hooks/useHeader';
import { OpenTeamType } from '@/app/types/TypesOfData/team-or-user/open-team-type';
import ShowUserOrTeam from '@/entities/showUsersOrTeam/showUsersOrTeam';
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

  if (!teams) {
    return <Preloader></Preloader>;
  }
  return (
    <motion.ul {...defaultContainer} className={Styles.Teams}>
      {teams?.map((team) => <ShowUserOrTeam key={team.id} Team={team}></ShowUserOrTeam>)}
    </motion.ul>
  );
}

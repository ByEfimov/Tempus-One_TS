import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamFromId } from '../../Api/Teams/getUserdataFromId';

export type OpenTeamType = {
    desc: string;
    image: string;
    projectDesc: string;
    projectTitle: string;
    teamMembers: { UserId: string; UserRole: string };
    title: string;
};

export default function TeamPage() {
    const { id } = useParams();
    const [team, setTeam] = useState<OpenTeamType | null>(null);
    useEffect(() => {
        getTeamFromId(id).then((team) => setTeam(team));
    }, []);
    return (
        team && (
            <h1 style={{ marginTop: '100px' }}>
                <img src={team.image}></img> {team.title}
            </h1>
        )
    );
}

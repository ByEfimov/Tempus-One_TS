/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamFromId } from '../../Api/Teams/getTeamdataFromId';
import ShowPosts from '../../Components/ShowPosts/Posts/ShowPosts';
import {
    TypesOfHeader,
    setTitleToHeader,
    setTypeOfHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useAppDispatch } from '../../Hooks/redus-hooks';

export type OpenTeamType = {
    desc: string;
    image: string;
    projectDesc: string;
    projectTitle: string;
    teamMembers: { UserId: string; UserRole: string }[];
    title: string;
    id: string;
};

export default function TeamPage() {
    const { id } = useParams();
    const [team, setTeam] = useState<OpenTeamType | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getTeamFromId(id).then((team) => setTeam(team));
        dispatch(
            setTypeOfHeader({ TypeOfHeader: TypesOfHeader.WithoutSearchBar })
        );
        dispatch(setTitleToHeader({ Title: 'Группа' }));
    }, []);

    return (
        team && (
            <>
                <h1 style={{ marginTop: '100px' }}>
                    <img src={team.image}></img> {team.title}
                </h1>
                <ShowPosts filter={team.id}></ShowPosts>
            </>
        )
    );
}

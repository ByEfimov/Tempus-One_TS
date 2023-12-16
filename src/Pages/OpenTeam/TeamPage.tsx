/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamFromId } from 'Api/Teams/getTeamDataFromId';
import ShowPosts from 'Components/ShowPosts/Posts/ShowPosts';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';

export default function TeamPage() {
    const { id } = useParams();
    const [team, setTeam] = useState<OpenTeamType | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getTeamFromId(id).then((team) => {
            setTeam(team);
            dispatch(setTitleOfHeader({ Title: team?.title }));
        });
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

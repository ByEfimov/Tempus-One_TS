/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamFromId } from 'Api/Teams/getTeamDataFromId';
import ShowPosts from 'Components/ShowPosts/Posts/ShowPosts';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import FakeOpenUser from 'Components/FakeData/FakeOpenUser';
import { ErrorNotification } from 'Components/Notifications/Notifications';

export default function TeamPage() {
    const { id } = useParams();
    const [OpenTeam, setOpenTeam] = useState<OpenTeamType | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getTeamFromId(id)
            .then((team) => {
                setOpenTeam(team);
                dispatch(setTitleOfHeader({ Title: team?.title }));
            })
            .catch(() => ErrorNotification('Сообщество не найдено.'));
    }, []);

    if (OpenTeam) {
        return (
            <>
                <h1 style={{ marginTop: '100px' }}>
                    <img src={OpenTeam.image}></img> {OpenTeam.title}
                </h1>
                <ShowPosts filter={OpenTeam.id}></ShowPosts>
            </>
        );
    } else if (!OpenTeam) {
        return <FakeOpenUser></FakeOpenUser>;
    }
}

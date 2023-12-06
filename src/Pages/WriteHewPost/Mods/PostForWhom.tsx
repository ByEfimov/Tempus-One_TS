import { useEffect, useState } from 'react';
import { getTeamFromId } from '../../../Api/Teams/getTeamdataFromId';
import { useAuth } from '../../../Hooks/useAuth';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import { setPostForWhom } from '../../../Store/slices/WritePostSlice';

const PostForWhom = () => {
    const { UserId, UserSubscriptions } = useAuth();
    const [teamsAdmin, setTeamsAdmin] = useState<
        { TeamName: string; TeamId: string }[]
    >([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (UserSubscriptions?.teams) {
            Object.values(UserSubscriptions?.teams).map((teamId) =>
                getTeamFromId(teamId).then((team) => {
                    if (
                        Array.isArray(team?.teamMembers) &&
                        team?.teamMembers.some(
                            (Member) =>
                                Member.UserId === UserId &&
                                Member.UserRole === 'Administrator'
                        )
                    ) {
                        setTeamsAdmin([
                            ...teamsAdmin,
                            { TeamName: team.title, TeamId: team.id },
                        ]);
                    }
                })
            );
        }
        dispatch(setPostForWhom({ PostForWhom: UserId }));
    }, []);

    return (
        UserId && (
            <select
                defaultValue={UserId}
                onChange={(e) =>
                    dispatch(setPostForWhom({ PostForWhom: e.target.value }))
                }
            >
                <option value={UserId}>Для себя</option>
                {teamsAdmin &&
                    teamsAdmin.map((team) => (
                        <option key={team.TeamId} value={team.TeamId}>
                            {team.TeamName}
                        </option>
                    ))}
            </select>
        )
    );
};
export default PostForWhom;

import Styles from '../Styles.module.scss';
import getUserAdmins from 'Api/Teams/get-user-admins';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setPostForWhom } from 'Store/slices/wite-post/write-post-slice';
import { useEffect, useState } from 'react';

const PostForWhom = () => {
    const { UserId, UserSubscriptions } = useAuth();
    const dispatch = useAppDispatch();
    const [teamsAdmin, setTeamsAdmin] = useState<
        { TeamName: string; TeamId: string }[]
    >([]);

    useEffect(() => {
        if (UserSubscriptions?.teams) {
            getUserAdmins(UserId).then((teams) => setTeamsAdmin(teams));
        }
        dispatch(setPostForWhom({ PostForWhom: UserId }));
    }, []);

    return (
        UserId && (
            <select
                className={Styles.select}
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

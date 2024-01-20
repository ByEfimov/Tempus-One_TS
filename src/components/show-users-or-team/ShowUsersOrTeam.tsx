import Styles from './Styles.module.scss';
import ShowLogo from 'Components/mini-components/show-logo';
import SubscribeButton from 'Components/mini-components/subscribe-button';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
import { useNavigate } from 'react-router-dom';

export default function ShowUserOrTeam({
    Team,
    User,
}: {
    Team?: OpenTeamType;
    User?: OpenUserType | null;
}) {
    const navigate = useNavigate();

    if (User) {
        return (
            <div
                className={Styles.Obj}
                onClick={() => navigate('/User/' + User.id)}
            >
                <div className={Styles.Data}>
                    <div className={Styles.Photo}>
                        <ShowLogo ImageUrl={User.photo}></ShowLogo>
                    </div>
                    <div className={Styles.Text}>
                        <div className={Styles.Title}>{User.name}</div>
                        <div className={Styles.Members}>
                            {(User.members &&
                                Object.values(User?.members).length) ||
                                0}{' '}
                            подписчиков
                        </div>
                    </div>
                </div>
                <div className={Styles.Activity}>
                    <SubscribeButton WhoWrotePost={User}></SubscribeButton>
                </div>
            </div>
        );
    } else if (Team) {
        return (
            <div
                className={Styles.Obj}
                onClick={() => navigate('/Team/' + Team.id)}
            >
                <div className={Styles.Data}>
                    <div className={Styles.Photo}>
                        <ShowLogo ImageUrl={Team.image}></ShowLogo>
                    </div>
                    <div className={Styles.Text}>
                        <div className={Styles.Title}>{Team.title}</div>
                        <div className={Styles.Members}>
                            {(Team.members &&
                                Object.values(Team.members).length) ||
                                0}{' '}
                            подписчиков
                        </div>
                    </div>
                </div>
                <div className={Styles.Activity}>
                    <SubscribeButton WhoWrotePost={Team}></SubscribeButton>
                </div>
            </div>
        );
    }
}

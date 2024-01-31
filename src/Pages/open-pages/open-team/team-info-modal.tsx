import Styles from './Styles.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import Members from 'Assets/Tempus-Ui/Components/Members/members';
import { IsModal } from 'Components/modals/is-modal';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';

const TeamInfoModal = ({
    setModalOpen,
    OpenTeam,
}: {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    OpenTeam: OpenTeamType;
}) => {
    const [membersArray, setMembersArray] = useState<OpenUserType[]>([]);

    useEffect(() => {
        const fetchMembersData = async () => {
            const memberPromises = Object.values(OpenTeam.members).map(
                async (user) => {
                    const userget = await getRequestObject(
                        'users/' + user.UserId,
                    );
                    return { ...userget, UserRole: user.UserRole };
                },
            );

            const membersData = await Promise.all(memberPromises);
            setMembersArray(membersData);
        };

        fetchMembersData();
    }, [OpenTeam]);

    const currentDate = moment().format('DD.MM.YY');

    return (
        <IsModal setModalOpen={setModalOpen}>
            <motion.ul
                className={Styles.TeamInfoModal}
                variants={formContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.li variants={formItem} className={Styles.Group}>
                    <div className={Styles.Title}>
                        Участники
                        <span>
                            {membersArray.length > 0 ? membersArray.length : 10}
                        </span>
                    </div>
                    <div className={Styles.Content}>
                        <Members MembersArray={membersArray}></Members>
                    </div>
                </motion.li>
                <motion.li variants={formItem} className={Styles.Group}>
                    <div className={Styles.Title}>Соревнования {}</div>
                    <div className={Styles.Content}></div>
                </motion.li>
                <motion.li variants={formItem} className={Styles.Group}>
                    <div className={Styles.Title}>
                        Планы на {currentDate} {}
                    </div>
                    <div className={Styles.Content}></div>
                </motion.li>
            </motion.ul>
        </IsModal>
    );
};
export default TeamInfoModal;

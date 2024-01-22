import { IsModal } from '../is-modal';
import { getRequestObject } from 'Api/requests/get-requests';
import ShowUserOrTeam from 'Components/show-users-or-team/ShowUsersOrTeam';
import { Post } from 'Types/TypesOfData/post/post';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import { FC, useEffect, useState } from 'react';

interface ViewsModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    post: Post;
}

const ViewsModal: FC<ViewsModal> = ({ setModalOpen, post }) => {
    return (
        <IsModal title="Просмотры" setModalOpen={setModalOpen}>
            {Object.values(post.PostShows).map((userId) => (
                <Viewer key={userId} userId={userId} />
            ))}
        </IsModal>
    );
};

interface Viewer {
    userId: string;
}

const Viewer: FC<Viewer> = ({ userId }) => {
    const [viewer, setViewer] = useState<OpenUserType | null>(null);

    useEffect(() => {
        getRequestObject('users/' + userId).then((user) => setViewer(user));
    }, []);

    return <ShowUserOrTeam User={viewer}></ShowUserOrTeam>;
};

export default ViewsModal;

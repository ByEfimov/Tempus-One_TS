import { FC, useEffect, useState } from 'react';
import { IsModal } from '../isModal';
import { Post } from 'Types/TypesOfData/Post/Post';
import ShowUserOrTeam from 'Components/ShowPosts/ShowUsersOrTeam/ShowUsersOrTeam';
import { getUserFromId } from 'Api/Users/getUserDataFromId';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';

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
        getUserFromId(userId).then((user) => setViewer(user));
    }, []);

    return <ShowUserOrTeam User={viewer}></ShowUserOrTeam>;
};

export default ViewsModal;

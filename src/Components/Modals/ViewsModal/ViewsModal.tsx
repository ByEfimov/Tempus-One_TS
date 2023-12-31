import { IsModal } from '../isModal';
import { getUserFromId } from 'Api/Users/getData/getUserDataFromId';
import ShowUserOrTeam from 'Components/ShowPosts/ShowUsersOrTeam/ShowUsersOrTeam';
import { Post } from 'Types/TypesOfData/Post/Post';
import { OpenUserType } from 'Types/TypesOfData/TeamOrUser/OpenUserType';
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
        getUserFromId(userId).then((user) => setViewer(user));
    }, []);

    return <ShowUserOrTeam User={viewer}></ShowUserOrTeam>;
};

export default ViewsModal;

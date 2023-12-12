import { useEffect } from 'react';
import ShowPosts from '../../Components/ShowPosts/Posts/ShowPosts';
import {
    TypesOfHeader,
    setHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useAppDispatch } from '../../Hooks/redus-hooks';

export default function MainPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            setHeader({
                Type: TypesOfHeader.WithSearchBar,
                Title: 'TEMPUS',
            })
        );
    }, []);

    return (
        <>
            <ShowPosts></ShowPosts>
        </>
    );
}

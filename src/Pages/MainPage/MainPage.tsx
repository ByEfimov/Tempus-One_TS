import { useEffect } from 'react';
import ShowPosts from '../../Components/ShowPosts/Posts/ShowPosts';
import {
    TypesOfHeader,
    setTitleToHeader,
    setTypeOfHeader,
} from '../../Store/slices/Header/HeaderSlice';
import { useAppDispatch } from '../../Hooks/redus-hooks';

export default function MainPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            setTypeOfHeader({ TypeOfHeader: TypesOfHeader.WithSearchBar })
        );
        dispatch(setTitleToHeader({ Title: 'TEMPUS' }));
    }, []);

    return (
        <>
            <ShowPosts></ShowPosts>
        </>
    );
}

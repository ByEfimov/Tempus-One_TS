import PostRender from './postRender';
import Styles from './styles.module.scss';
import { Select, SelectTypes, defaultContainer, defaultItem } from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { useAuth } from '@/app/hooks/useAuth';
import { useHeader } from '@/app/hooks/useHeader';
import { setLastPostKey } from '@/app/slices/postsSlice';
import { PostType } from '@/app/slices/wite-post/write-post-slice';
import { getRequestArray } from '@/features/api/requests/get-requests';
import { FiltersPosts, aplyFilterPosts } from '@/shared/filters/filter-posts';
import ShowDataOrPreloader from '@/shared/showDataOrPreloader';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ShowPosts = ({
  AuthorFilter = '',
  ShowFilters = false,
  ShowTitle = false,
}: {
  AuthorFilter?: string;
  ShowFilters?: boolean;
  ShowTitle?: boolean;
}) => {
  const [posts, setPosts] = useState<PostType[]>();
  const [selectFilter, setSelectFilter] = useState<string>('Default');
  const { UserSubscriptions, UserId } = useAuth();
  const { HeaderSearchBar } = useHeader();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (HeaderSearchBar) {
        const filteredPosts = aplyFilterPosts(
          selectFilter,
          UserSubscriptions,
          UserId,
          HeaderSearchBar,
          AuthorFilter,
          posts,
        );
        setPosts(filteredPosts);
      } else {
        getRequestArray('/posts').then((posts) => {
          const filteredPosts = aplyFilterPosts(
            selectFilter,
            UserSubscriptions,
            UserId,
            HeaderSearchBar,
            AuthorFilter,
            posts,
          );
          setPosts(filteredPosts);
          dispatch(setLastPostKey(Object.keys(posts).pop()));
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectFilter, HeaderSearchBar]);

  return (
    <div className={Styles.Posts}>
      {ShowFilters && (
        <Select Array={FiltersPosts} setSelect={setSelectFilter} Select={selectFilter} Type={SelectTypes.Row}></Select>
      )}
      {ShowTitle && (
        <motion.div variants={defaultItem} className={Styles.Title}>
          Посты <div>{posts?.length || 0}</div>
        </motion.div>
      )}

      <ShowDataOrPreloader data={posts}>
        <motion.div {...defaultContainer} className={Styles.Render} variants={defaultItem}>
          {posts?.map((post) => <PostRender key={post.id} post={post} />)}
        </motion.div>
      </ShowDataOrPreloader>
    </div>
  );
};
export default ShowPosts;

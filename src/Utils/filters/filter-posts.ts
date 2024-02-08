import { Post } from 'Types/TypesOfData/post/post';

export function aplyFilterPosts(
    filter: string,
    UserSubscriptions:
        | {
              teams?:
                  | {
                        [key: string]: string;
                    }
                  | undefined;
              users?:
                  | {
                        [key: string]: string;
                    }
                  | undefined;
          }
        | null
        | undefined,
    UserId: string,
    HeaderSearchBar: string,
    AuthorFilter: string,
    array?: Post[],
) {
    let filterOfGroup;
    if (filter === FiltersPosts[0].value) {
        filterOfGroup = array;
    } else if (filter === FiltersPosts[1].value && UserSubscriptions) {
        filterOfGroup = array?.filter((post) => {
            return Object.values(UserSubscriptions).some(
                (obj) => post.PostAuthorId in obj,
            );
        });
    } else if (filter === FiltersPosts[2].value) {
        filterOfGroup = array?.filter((post) => post.PostAuthorId === UserId);
    }

    if (filterOfGroup) {
        return filterOfGroup.filter(
            (post) =>
                (post.PostTitle.toLocaleLowerCase().includes(
                    HeaderSearchBar.toLocaleLowerCase(),
                ) ||
                    post.PostDataBlocks[0].text
                        .toLocaleLowerCase()
                        .includes(HeaderSearchBar.toLocaleLowerCase())) &&
                post.PostAuthorId.includes(AuthorFilter),
        );
    } else {
        return filterOfGroup;
    }
}

export const FiltersPosts = [
    { label: 'Все посты', value: 'Default' },
    { label: 'Интересное', value: 'Interesting' },
    { label: 'Только мои', value: 'OnlyMy' },
];

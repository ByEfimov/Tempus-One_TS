import { PostType } from 'Store/slices/wite-post/write-post-slice';

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
    array?: PostType[],
) {
    let filterOfGroup;
    if (filter === FiltersPosts[0].value) {
        filterOfGroup = array;
    } else if (filter === FiltersPosts[1].value && UserSubscriptions) {
        filterOfGroup = array?.filter((post) => {
            return Object.values(UserSubscriptions).some(
                (obj) => post.author && post.author in obj,
            );
        });
    } else if (filter === FiltersPosts[2].value) {
        filterOfGroup = array?.filter((post) => post.author === UserId);
    }

    if (filterOfGroup) {
        return filterOfGroup.filter((post) => {
            const filteredArray = post.blocks.filter(
                (obj) => obj?.type === 'Text',
            );

            return (
                (
                    ('content' in filteredArray[0]!.data &&
                        filteredArray[0]?.data.content) ||
                    ''
                )
                    .toLocaleLowerCase()
                    .includes(HeaderSearchBar.toLocaleLowerCase()) &&
                post.author &&
                post.author.includes(AuthorFilter)
            );
        });
    } else {
        return filterOfGroup;
    }
}

export const FiltersPosts = [
    { label: 'Все посты', value: 'Default' },
    { label: 'Интересное', value: 'Interesting' },
    { label: 'Только мои', value: 'OnlyMy' },
];

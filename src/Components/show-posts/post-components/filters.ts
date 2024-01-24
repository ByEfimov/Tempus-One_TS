import { Post } from 'Types/TypesOfData/post/post';

export function aplyFilter(
    array: Post[],
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
) {
    let filterOfGroup;
    if (filter === Filters[0].value) {
        filterOfGroup = array;
    } else if (filter === Filters[1].value && UserSubscriptions) {
        filterOfGroup = array.filter((post) => {
            return Object.values(UserSubscriptions).some(
                (obj) => post.PostAuthorId in obj,
            );
        });
    } else if (filter === Filters[2].value) {
        filterOfGroup = array.filter((post) => post.PostAuthorId === UserId);
    }

    if (filterOfGroup) {
        return filterOfGroup.filter(
            (post) =>
                post.PostTitle.toLocaleLowerCase().includes(
                    HeaderSearchBar.toLocaleLowerCase(),
                ) ||
                post.PostDataBlocks[0].text
                    .toLocaleLowerCase()
                    .includes(HeaderSearchBar.toLocaleLowerCase()),
        );
    } else {
        return filterOfGroup;
    }
}

export const Filters = [
    { name: 'Все посты', value: 'Default' },
    { name: 'Интересное', value: 'Interesting' },
    { name: 'Только мои', value: 'OnlyMy' },
];

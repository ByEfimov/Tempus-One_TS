import { Post } from '../Store/slices/PostsSlice';

export function checkArrayIsFull(array: Post) {
    let checkArray = 0;

    array.PostDataBlocks.map((item) => {
        if (item.text !== '' && item.title !== '') {
            if (checkArray <= array.PostDataBlocks.length) {
                checkArray += 1;
            }
        }
    });
    if (array.PostTitle !== '') {
        checkArray += 1;
    }
    if (checkArray === array.PostDataBlocks.length + 1) {
        return true;
    } else {
        return false;
    }
}

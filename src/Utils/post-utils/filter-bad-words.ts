import { NewPostType } from 'Types/TypesOfData/post/new-post-type';
import array from 'badwords/array';
import { flatWords } from 'russian-bad-words';

export default function filterBadWords(text: string | undefined) {
    const returnArray: string[] = [];

    const arrayRus = text?.split(' ');

    arrayRus?.filter((word) => {
        flatWords.includes(word.toLowerCase()) ||
        array.includes(word.toLowerCase())
            ? returnArray.push('*'.repeat(word.length))
            : returnArray.push(word);
    });
    return returnArray.join(' ');
}

export const applyFilterToNewPost = (post: NewPostType): NewPostType => {
    const sanitizedPost: NewPostType = {
        ...post,
        PostTitle: filterBadWords(post.PostTitle),
    };

    const sanitizedBlocks = post.PostDataBlocks.map((block) => {
        const sanitizedText = filterBadWords(block.text);
        const sanitizedTitle = filterBadWords(block.title);
        return {
            ...block,
            title: sanitizedTitle,
            text: sanitizedText,
        };
    });

    return {
        ...sanitizedPost,
        PostDataBlocks: sanitizedBlocks,
    };
};

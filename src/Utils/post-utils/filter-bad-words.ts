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

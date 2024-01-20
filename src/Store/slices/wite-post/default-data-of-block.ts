import { BlockOfPostType } from 'Types/TypesOfData/post/write-post';
import { ModsOfWritePost } from 'Utils/mods-of-comps';

export default function DefaultDataOfBlock(
    id: number,
    type: string,
): BlockOfPostType {
    if (type === ModsOfWritePost.code) {
        return {
            text: '<div>Пиши свой код здесь.</div>',
            id: id,
            type: ModsOfWritePost.code,
            title: '',
        };
    } else if (type === ModsOfWritePost.image) {
        return {
            text: '',
            id: id,
            type: ModsOfWritePost.image,
            title: '',
        };
    } else if (type === ModsOfWritePost.survey) {
        return {
            text: '',
            id: id,
            type: 'survey',
            title: '',
            variants: [],
        };
    } else {
        return { text: '', id: 0, type: 'text', title: '' };
    }
}

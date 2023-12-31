import { BlockOfPostType } from 'Types/TypesOfData/Post/WritePost';
import { ModsOfWritePost } from 'Utils/ModsOfComps';

export default function NewBlocks(id: number, type: string): BlockOfPostType {
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

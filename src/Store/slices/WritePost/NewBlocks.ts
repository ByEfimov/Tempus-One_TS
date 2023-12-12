import { ModsOfWritePost } from '../../../Utils/ModsOfComps';
import { BlockOfPostType } from './WritePostSlice';

export default function NewBlocks(id: number, type: string): BlockOfPostType {
    if (type === ModsOfWritePost.kod) {
        return {
            text: '<div>Пиши свой код здесь.</div>',
            id: id,
            type: ModsOfWritePost.kod,
            title: '',
        };
    } else if (type === ModsOfWritePost.image) {
        return {
            text: '',
            id: id,
            type: ModsOfWritePost.image,
            title: '',
        };
    } else {
        return { text: '', id: 0, type: 'text', title: '' };
    }
}

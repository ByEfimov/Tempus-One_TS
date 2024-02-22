import { blockTypes } from './write-post-slice';

export default function getNewBlockStructure(
    newBlockType: blockTypes,
    newId: number,
) {
    if (newBlockType === blockTypes.Text) {
        return {
            type: blockTypes.Text,
            data: { content: 'Расскажи о чем то...' },
            isEditing: true,
            id: newId,
        };
    }
    if (newBlockType === blockTypes.Code) {
        return {
            type: blockTypes.Code,
            data: { code: '<div>Пиши свой код здесь...</div>' },
            isEditing: true,
            id: newId,
        };
    }
    if (newBlockType === blockTypes.Survey) {
        return {
            type: blockTypes.Survey,
            data: {
                question: 'Твой вопрос здесь...',
                variants: [{ text: 'Вариант ответа 1', id: 0 }],
            },
            isEditing: true,
            id: newId,
        };
    }
    if (newBlockType === blockTypes.Image) {
        return {
            type: blockTypes.Image,
            data: { imageUrl: '' },
            isEditing: true,
            id: newId,
        };
    }
    return;
}

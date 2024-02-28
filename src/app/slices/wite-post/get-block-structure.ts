import { blockTypes } from './write-post-slice';

export default function getNewBlockStructure(newBlockType: blockTypes, newId: number) {
  const blockStructures = {
    [blockTypes.Text]: {
      type: blockTypes.Text,
      data: { content: 'Расскажи о чем то...' },
    },
    [blockTypes.Code]: {
      type: blockTypes.Code,
      data: { code: '<div>Пиши свой код здесь...</div>' },
    },
    [blockTypes.Survey]: {
      type: blockTypes.Survey,
      data: {
        question: 'Твой вопрос здесь...',
        variants: [{ text: 'Вариант ответа 1', id: 0 }],
      },
    },
    [blockTypes.Image]: {
      type: blockTypes.Image,
      data: { imageUrl: '' },
    },
  };

  return blockStructures[newBlockType] && { ...blockStructures[newBlockType], isEditing: true, id: newId };
}

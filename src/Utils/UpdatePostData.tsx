import { PostData } from '../Pages/WriteHewPost/WritePost';

export function UpdateData(
    setData: React.Dispatch<React.SetStateAction<PostData>>,
    SelectMode: { type: string; id: number },
    AllDataOfPost: Array<{
        id: string;
        type: string;
        text: string;
        title?: string;
    }>,
    mode: string,
    e?:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    DataText?: string
) {
    const updatedData = AllDataOfPost.slice();
    const objectToUpdate = updatedData.find(
        (item) => item.id === SelectMode.id
    );
    if (objectToUpdate) {
        if (mode === 'text') {
            objectToUpdate.text = e?.target.value || DataText || '';
        } else {
            objectToUpdate.title = e?.target.value;
        }
    }
    setData(updatedData);
}

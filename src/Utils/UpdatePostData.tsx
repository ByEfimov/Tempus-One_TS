import { PostData } from '../Pages/WriteHewPost/WritePost';

export function UpdateData(
    setData: React.Dispatch<React.SetStateAction<PostData>>,
    e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    SelectMode: { type: string; id: number },
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>,
    mode: string
) {
    const updatedData = AllDataOfPost.slice();
    const objectToUpdate = updatedData.find(
        (item) => item.id === SelectMode.id
    );
    if (objectToUpdate) {
        if (mode === 'text') {
            objectToUpdate.text = e.target.value;
        } else {
            objectToUpdate.title = e.target.value;
        }
    }
    setData(updatedData);
}

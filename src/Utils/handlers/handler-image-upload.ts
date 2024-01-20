import { ChangeEvent } from 'react';

export const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    setUserPhoto: (value: React.SetStateAction<string>) => void,
) => {
    const reader = new FileReader();
    reader.onload = () => {
        setUserPhoto(reader.result as string);
    };
    if (e.target.files?.[0]) {
        reader.readAsDataURL(e.target.files?.[0]);
    }
};

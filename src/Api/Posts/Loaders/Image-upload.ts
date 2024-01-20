export const LoadImage = (image: EventTarget & HTMLInputElement) => {
    const file = image.files?.[0];
    const reader = new FileReader();

    return new Promise<string>((resolve) => {
        reader.onload = () => {
            resolve(reader.result as string);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });
};

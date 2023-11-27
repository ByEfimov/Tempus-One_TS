import { RefObject } from 'react';

export default function closePopup(
    SelectModalRef: RefObject<HTMLDivElement>,
    Styles: string,
    setIsModalClueCodeOpen: (open: boolean) => void
) {
    SelectModalRef?.current?.classList.add(Styles);
    setTimeout(() => {
        setIsModalClueCodeOpen(false);
    }, 300);
}

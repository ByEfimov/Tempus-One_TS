export type BlockOfPostType = {
    text: string;
    id: number;
    type: string;
    title?: string;
    variants?: { id: number | undefined; text: string }[];
};
export type SelectModeType = {
    type: string;
    id: number;
};

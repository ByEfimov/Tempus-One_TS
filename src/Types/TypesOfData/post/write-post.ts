export type BlockOfPostType = {
    text: string;
    id: number;
    type: string;
    title?: string;
    variants?: { id: number | undefined; text: string; selected?: number }[];
};
export type SelectModeType = {
    type: string;
    id: number;
};

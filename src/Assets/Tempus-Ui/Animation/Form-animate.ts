export const formItem: formItemType = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export type formItemType = {
    hidden: { y: number; opacity: number };
    visible: {
        y: number;
        opacity: number;
    };
};

export const formContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

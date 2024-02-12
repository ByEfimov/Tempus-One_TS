export const formItem = {
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

export const defaultItem = {
    hidden: { x: -2, opacity: 0, scale: 0.95 },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
};

export const formContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2,
        },
    },
};

export const defaultContainer = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1,
        },
    },
};

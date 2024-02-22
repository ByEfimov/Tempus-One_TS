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

const containerForm = {
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

export const formContainer = {
    initial: 'hidden',
    animate: 'visible',
    variants: containerForm,
};

const containerDefault = {
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

export const defaultContainer = {
    initial: 'hidden',
    animate: 'visible',
    variants: containerDefault,
};

export const formItem = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
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
            delayChildren: 0.3,
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
            delayChildren: 0.3,
            staggerChildren: 0.3,
        },
    },
};

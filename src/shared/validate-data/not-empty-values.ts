interface AnyObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export default function isObjectValuesNotEmpty(obj: AnyObject): boolean {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            if (!isObjectValuesNotEmpty(obj[key])) {
                return false;
            }
        } else if (
            obj[key] === null ||
            obj[key] === '' ||
            obj[key] === undefined
        ) {
            return false;
        }
    }
    return true;
}

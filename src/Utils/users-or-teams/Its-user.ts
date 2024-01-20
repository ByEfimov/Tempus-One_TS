export default function ItsUser(id: string | undefined) {
    if (id && id[0] === '-') {
        return false;
    } else {
        return true;
    }
}

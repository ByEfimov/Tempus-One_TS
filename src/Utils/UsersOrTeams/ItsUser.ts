export default function ItsUser(id: string | undefined) {
    if (id) {
        if (id[0] === '-') {
            return false;
        } else {
            return true;
        }
    }
}

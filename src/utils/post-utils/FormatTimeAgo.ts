import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function formatTimeAgo(unixTimestamp: number): string {
    const specifiedDate = new Date(unixTimestamp * 1000);
    return formatDistanceToNow(specifiedDate, {
        addSuffix: true,
        locale: ru,
    });
}

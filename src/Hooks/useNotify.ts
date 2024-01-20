import { useAppSelector } from './redux-hooks';

export function useNotify() {
    const { Type, TimeLine, Massage } = useAppSelector((state) => state.Notify);

    return {
        NotifyType: Type,
        NotifyTimeLine: TimeLine,
        NotifyMassage: Massage,
    };
}

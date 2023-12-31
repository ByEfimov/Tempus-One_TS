/* eslint-disable import/order */
import { createSlice } from '@reduxjs/toolkit';
import {
    NotifyType,
    TypesOfNotifications,
} from 'Types/TypesOfData/Notifications/NotifyType';

const initialState: NotifyType = {
    Type: TypesOfNotifications.Massage,
    Massage: '',
    TimeLine: 0,
};

const NotifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        setNotification(state, action) {
            if (state.TimeLine === 0) {
                state.Type = action.payload.Type;
                state.TimeLine = 3000;
                state.Massage = action.payload.Massage;
            }
        },
        clearNotify(state) {
            state.Type = TypesOfNotifications.Massage;
            state.TimeLine = 0;
            state.Massage = '';
        },
    },
});
export const { setNotification, clearNotify } = NotifySlice.actions;

export default NotifySlice.reducer;

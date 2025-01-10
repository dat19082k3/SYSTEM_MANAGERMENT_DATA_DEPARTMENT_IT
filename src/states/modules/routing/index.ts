import {createSlice} from "@reduxjs/toolkit";

const routingSlice = createSlice({
    name: 'routing',
    initialState: {
        route: ""
    },
    reducers: {
        initialSaga: (state, action: { payload: string }) => {
            state.route = action.payload;
        }
    }
})

export const {
    initialSaga
} = routingSlice.actions

export default routingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : null

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        signUpStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signUpSuccess: (state) =>{
            state.loading = false;
            state.error = null;
        },
        signUpFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        updateCurrentUser:(state, action)=>{
            state.currentUser = action.payload;
        }
    }
})

export const {signInFailure, signInSuccess, signInStart, signUpFailure, signUpStart, signUpSuccess, updateCurrentUser} = userSlice.actions
export default userSlice.reducer;
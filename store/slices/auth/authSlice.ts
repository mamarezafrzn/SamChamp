import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState:{user: null, loading: false,error:null},
    reducers:{
        authSuccess:(state,action)=>{
            state.user = action.payload
        },
        authError:(state,action)=>{
            state.error = action.payload
        },

    }
})


export const {authSuccess,authError} = authSlice.actions;
export default authSlice.reducer;
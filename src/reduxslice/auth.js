import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null || JSON.parse(localStorage.getItem("rocket-data")) ,
  loader: true,
  signupData:null,
  loading:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setSignupData(state,value){
      state.signupData=value.payload;
  },
  setLoading(state,value){
    state.loading=value.payload;
},
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },

  
  
  
});

export default authSlice;
export const { userExists, userNotExists, setSignupData ,setLoading} = authSlice.actions;

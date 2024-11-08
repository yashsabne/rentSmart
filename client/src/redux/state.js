import { createSlice} from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings
    }, 
    setPropertyList: (state, action) => {
      state.user.propertyList = action.payload
    },
    setUserPremium: (state, action) => {
      if (state.user) {
        state.user.premiumMember = action.payload; // independently update premium status
      }
    } 
  }
})

export const { setLogin, setLogout, setListings, setPropertyList,setUserPremium } = userSlice.actions
export default userSlice.reducer
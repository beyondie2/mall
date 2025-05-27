import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {email:''}

const loadMemberCookie = () => { //쿠키에서 로그인 정보 로딩
  const memberInfo = getCookie("member")

  //닉네임 처리
  if(memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
  }
  return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param)
})

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login.....")
      // const data = action.payload //{email, pw로 구성 }
      // return {email: data.email} //새로운 상태
      const payload = action.payload //{소셜로그인 회원이 사용}
      setCookie("member",JSON.stringify(payload), 1) //1일
      return payload
    },

    logout: (state, action) => {
      console.log("logout....")
      removeCookie("member")
      return {...initState}
    }
  },
  extraReducers: (builder) => {
    builder.addCase( loginPostAsync.fulfilled, (state, action) => {
    console.log("fulfilled")

    const payload = action.payload
    
    //정상적인 로그인시에만 저장
    if(!payload.error){
      setCookie("member", JSON.stringify(payload), 1) //1일
    }      

    return payload
    
    })
    .addCase(loginPostAsync.pending, (state,action) => {
    console.log("pending")
    })
    .addCase(loginPostAsync.rejected, (state,action) => {
    console.log("rejected")
    })
  }
})

export const {login,logout} = loginSlice.actions
export default loginSlice.reducer
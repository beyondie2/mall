import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

// const rest_api_key =`9a98be112846aea687ed260f7092a6e0` //REST키값
const rest_api_key =`f438bc3cdae1a0ab759eed4deb9bd674` //REST키값

const redirect_uri =`http://localhost:3000/member/kakao`

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url =`https://kauth.kakao.com/oauth/token` //추가 

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  console.log("kakaoURL: " + kakaoURL)
  return kakaoURL
}

export const getAccessToken = async (authCode) => {
  console.log("getAccessToken안")
  const header = {
   headers: {
     "Content-Type": "application/x-www-form-urlencoded",
   }
  }
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code:authCode
  }
  
  const res = await axios.post(access_token_url, params , header)

  const accessToken = res.data.access_token

  return accessToken
}

export const getMemberWithAccessToken = async(accessToken) => {

  const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)
  return res.data

}

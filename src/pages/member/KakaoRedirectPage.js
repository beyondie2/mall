import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams()
  const authCode = searchParams.get("code")
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("엑세스토큰" + accessToken)
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("------get Member with access token-------------")
        console.log(memberInfo)
      })
    })
  }, [authCode])
  
  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  )
}
export default KakaoRedirectPage;
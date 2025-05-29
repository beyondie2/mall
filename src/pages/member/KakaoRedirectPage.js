import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin"; //화면 이동 처리

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams()
  const {moveToPath} = useCustomLogin() // 화면 이동 처리
  const dispatch = useDispatch()

  const authCode = searchParams.get("code")
  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("엑세스토큰" + accessToken)
      getMemberWithAccessToken(accessToken).then(memberInfo => {
        console.log("------authCode아쓰코드-------------")
        console.log(authCode)
        console.log(memberInfo)

        dispatch(login(memberInfo))

        // 화면 이동 처리
        if(memberInfo && !memberInfo.social){//소셜 회원이 아니라면
          console.log("소설 회원이 아님")
          moveToPath("/")
        }else {
          moveToPath("/member/modify")
        }

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
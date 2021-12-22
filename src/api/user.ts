/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-26 15:56:50
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-21 11:40:22
 */
import Http from "@/api/http";
export const loginApi = async (data:any)=>{
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return  Http.post("/v1/user/login", data);
}

export const getUserInfo = (accessToken:any)=>{
  const data = {
    // [tokenName]: accessToken, //配置中获取，暂时写死
    accessToken:accessToken
  }
  return Http.post("/v1/user/userInfo", data);
}
export const logout = (accessToken:string|null)=>{
  return Http.post("/v1/user/logout");
}
export const register = ()=>{
  return Http.post("/v1/user/logout");
}


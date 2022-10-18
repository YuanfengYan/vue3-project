import Http from "@/api/http";
// 获取上传图片token
export const getToken = async (data:any)=>{
  return await Http.post("/upload/token",data);
}

// // 获取上传图片token
// export function getToken(params) {
//   return request({
//     url: '/upload/token',
//     method: 'post',
//     params
//   })
// }

import Http from "@/api/http";
// 获取文章列表
export const list = async (params:any)=>{
  return await Http.get("/comment",params);
}
// 获取文章列表
export const create = async (params:any)=>{
  return await Http.post("/comment",params);
}
// 获取文章列表
export const detail = async (params:any)=>{
  return await Http.get("/comment/"+params.id,params);
}
// 获取文章列表
export const update = async (params:any)=>{
  return await Http.put("/comment/"+params.id,params);
}
// 获取文章列表
export const detele = async (params:any)=>{
  return await Http.get("/comment/"+params.id,params);
}



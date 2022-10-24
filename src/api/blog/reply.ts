import Http from "@/api/http";
// 获取文章列表
export const list = async (params:any)=>{
  return await Http.get("/reply",params);
}
// 获取文章列表
export const create = async (params:any)=>{
  return await Http.post("/reply/"+params.id,params);
}
// 获取文章列表
export const detail = async (params:any)=>{
  return await Http.get("/reply/"+params.id);
}
// 获取文章列表
export const update = async (params:any)=>{
  return await Http.put("/reply/"+params.id,params);
}
// 获取文章列表
export const delete2 = async (params:any)=>{
  return await Http.delete("/reply/"+params.id,params);
}

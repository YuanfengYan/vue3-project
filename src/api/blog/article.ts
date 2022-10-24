import Http from "@/api/http";
// 获取文章列表
export const list = async (data:any)=>{
  return await Http.get("/article",data);
}
// 创建文章
export const create = async (data:any)=>{
  return await Http.post("/article",data);
}
// 获取文章详情
export const detail = async (data:any)=>{
  return await Http.get("/article/"+ data.id,data);
}
// 更新文章
export const update = async (data:any)=>{
  return await Http.put("/article/"+ data.id,data);
}
// 删除文章
export const detele = async (data:any)=>{
  return await Http.delete("/article/"+ data.id,data);
}

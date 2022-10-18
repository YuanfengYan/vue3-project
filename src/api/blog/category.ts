import Http from "@/api/http";
// 获取文章列表
export const list = async (params:any)=>{
  return await Http.get("/category",params);
}
// 创建分类
export const create = async (params:any)=>{
  return await Http.post("/category",params);
}
// 获取分类详情
export const detail = async (data:any)=>{
  return await Http.get("/category"+ data.id);
}
// 更新分类
export const update = async (data:any)=>{
  return await Http.put("/category"+ data.id);
}
// 删除分类
export const deleteCategory = async (data:any)=>{
  return await Http.delete("/category/"+ data.id);
}



import Http from "@/api/http";
export const login = async (data:any)=>{
  return await Http.post("/admin/login",data);
}
export const getInfo = async ()=>{
  return await Http.get("/admin/auth");
}


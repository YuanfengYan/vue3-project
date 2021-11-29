/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-10-27 16:36:42
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-11-29 11:18:20
 */
import Mock from "mockjs"
function loginByUsername(data:any){

  const params:any = JSON.parse(data.body)
  
  if(params.name=='admin'&&params.pass=='admin'){
    return {
      token:'admintoken',
      user_id:1,
      name:'管理员'
    }
  }else{
    return null
  }
}
Mock.mock(/\/v1\/user\/login/, 'post', loginByUsername)
Mock.mock(/\/v1\/user\/userInfo/, 'post', (config:any)=>{
  const params:any = JSON.parse(config.body)
  const { accessToken } = config.body
  let permissions = ['admin']
      let username = 'admin'
      if ('admin-accessToken' === accessToken) {
        permissions = ['admin']
        username = 'admin'
      }
      if ('editor-accessToken' === accessToken) {
        permissions = ['editor']
        username = 'editor'
      }
      if ('test-accessToken' === accessToken) {
        permissions = ['admin', 'editor']
        username = 'test'
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          permissions,
          username,
          'avatar|1': [
            'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
          ],
        },
      }

})
Mock.mock(/\/v1\/user\/logout/, 'post', (config:any)=>{
  return {
    code: 200,
    msg: 'success',
  }
})
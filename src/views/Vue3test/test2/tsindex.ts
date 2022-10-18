/*
 * @Author: YuanfengYan yanyuanfeng_sspu@163.com
 * @Date: 2022-09-02 17:51:41
 * @LastEditors: YuanfengYan yanyuanfeng_sspu@163.com
 * @LastEditTime: 2022-09-02 18:11:29
 * @FilePath: /my-project/src/views/Vue3test/test2/tsindex.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 函数重载
export function add(name: string, age: string): string
export function add(name: number, age: number): number
export function add(name: any, age: any): any{
  return name + age;
}
export function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
loggingIdentity([1,'2'])

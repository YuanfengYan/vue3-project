// 不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。
// 模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，
// 所以没有必要为导出的对象增加额外的模块层。
// https://www.tslang.cn/docs/handbook/namespaces-and-modules.html
export  namespace Valid {
  export interface Color { 
  getname(): string,
  }
}

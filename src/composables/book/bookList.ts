  // @ts-nocheck
/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-21 14:18:33
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2022-07-29 16:06:43
 */

import { getBookList } from '@/api/book';

import {  ref, onMounted ,onRenderTriggered} from 'vue';
export default function books() {
  const list = ref([]);
  const getBooks = async () => {
      const res = await getBookList();
      list.value = res['list'];
      return;
  };
  const changeList =function(){
    // debugger
    console.log(list.value)
    list.value.shift()
  }
  onMounted(() => {
      // getBooks();
  });

  onRenderTriggered(e=>{
    console.log(e)
  })
  return {
      list,
      getBooks,
      changeList
  };
}
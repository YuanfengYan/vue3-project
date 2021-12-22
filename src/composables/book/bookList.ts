/*
 * @Description: 
 * @Author: yanyuanfeng
 * @Date: 2021-12-21 14:18:33
 * @LastEditors: yanyuanfeng
 * @LastEditTime: 2021-12-21 14:28:37
 */
import { getBookList } from '@/api/book';

import {  ref, onMounted } from 'vue';
export default function books() {
  const list = ref([]);
  const getBooks = async () => {
      const res = await getBookList();
      list.value = res['list'];
      return;
  };
  onMounted(() => {
      // getBooks();
  });
  return {
      list,
      getBooks,
  };
}
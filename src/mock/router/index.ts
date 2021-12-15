// const data = [
//   { 
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     children: [
//       {
//         path: 'home',
//         name: 'home',
//         component: () => import('@/views/Home/index.vue'),
//         meta: {
//           title: '首页',
//           icon: 'home',
//           affix: true,
//         },
//       },
//     ],
//   },
//   { 
//     path: '/exp',
//     component: Layout,
//     redirect: 'noRedirect',
//     meta: { title: '配置', icon: 'users-cog', permissions: ['admin'] },
//     children: [
//       {
//         path: 'permissions',
//         name: 'permissions',
//         component: () => import('@/views/Example/Permissions/index.vue'),
//         meta: {
//           title: '权限分配',
//           icon: 'home',
//           affix: true,
//         },
//       },
//     ],
//   }
// ];
// module.exports = [
//   {
//     url: '/menu/navigate',
//     type: 'post',
//     response() {
//       return { code: 200, msg: 'success', data: data }
//     },
//   },
// ]

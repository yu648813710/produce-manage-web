export const DynamicRoute = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Root.vue'),
    redirect: '/Home',
    children: [

    ]
  }
]
export const ConstantRoute = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { name: '登录' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { name: '404' }
  }
]

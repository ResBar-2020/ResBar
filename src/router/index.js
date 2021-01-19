import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/bitacoras',
      name: 'Bitacoras',
      component: () => import('../views/Bitacoras.vue')
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: () => import('../views/Categorias.vue')
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: () => import('../views/Clientes.vue')
    },
    {
      path: '/domicilio',
      name: 'Domicilio',
      component: () => import('../views/Domicilio.vue')
    },
    {
      path: '/informes',
      name: 'Informes',
      component: () => import('../views/Informes.vue')
    },
    {
      path: '/',
      name: 'Ordenes',
      component: () => import('../views/Ordenes.vue')
    },
    {
      path: '/parametros',
      name: 'Parametros',
      component: () => import('../views/Parametros.vue')
    },
    {
      path: '/productos',
      name: 'Productos',
      component: () => import('../views/Productos.vue')
    },
    {
      path: '/recoger',
      name: 'Recoger',
      component: () => import('../views/Recoger.vue')
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('../views/Usuarios.vue')
    },
    {
      path: '/menuProductos',
      name: 'menuProductos',
      component: () => import('../views/MenuProductos.vue')
    },
    {
      path: '/ordenes/nuevaOrden',
      name: 'nuevaOrden',
      component: () => import('../views/nuevaOrden.vue')
    },
    {
      path: '/*',
      name: 'error404',
      component: () => import('../views/Error404.vue')
    },
]

const router = new VueRouter({
  routes
})

export default router

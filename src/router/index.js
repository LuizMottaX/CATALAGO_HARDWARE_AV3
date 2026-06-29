import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import Login    from '../pages/Login.vue'
import Home     from '../pages/Home.vue'
import Lista    from '../pages/Lista.vue'
import Cadastro from '../pages/Cadastro.vue'
import Sobre    from '../pages/Sobre.vue'

const routes = [
  { path: '/login',        component: Login    },
  { path: '/',             component: Home     },
  { path: '/lista',        component: Lista    },
  { path: '/cadastro',     component: Cadastro },
  { path: '/cadastro/:id', component: Cadastro },
  { path: '/sobre',        component: Sobre    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()

  // Espera o Firebase verificar o estado de autenticação inicial
  // antes de redirecionar (evita redirect errado no reload)
  if (!userStore.pronto) {
    await new Promise(resolve => {
      const unwatch = setInterval(() => {
        if (userStore.pronto) {
          clearInterval(unwatch)
          resolve()
        }
      }, 50)
    })
  }

  if (to.path !== '/login' && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router

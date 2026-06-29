<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
    style="background: radial-gradient(ellipse at center, #161b22 0%, #0d1117 100%);"
  >
    <v-card
      width="420"
      rounded="xl"
      elevation="16"
      class="pa-8"
      style="background: rgba(22, 27, 34, 0.95); border: 1px solid rgba(0, 180, 216, 0.2); backdrop-filter: blur(12px);"
    >
      <div class="text-center mb-6">
        <v-icon size="64" color="primary" class="mb-3">mdi-memory</v-icon>
        <h1 class="text-h5 font-weight-bold">Catálogo de Hardware</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Faça login para continuar</p>
      </div>

      <v-divider class="mb-6" />

      <v-btn
        block
        size="large"
        variant="outlined"
        :loading="carregando"
        @click="fazerLogin"
      >
        <template #prepend>
          <svg width="20" height="20" viewBox="0 0 24 24" class="mr-2">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </template>
        Entrar com Google
      </v-btn>

      <v-alert
        v-if="erro"
        type="error"
        variant="tonal"
        class="mt-4"
        rounded="lg"
        closable
        @click:close="erro = null"
      >
        {{ erro }}
      </v-alert>

      <p class="text-caption text-center text-medium-emphasis mt-6">
        Acesso restrito a usuários autorizados.
      </p>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const carregando = ref(false)
const erro = ref(null)

async function fazerLogin() {
  carregando.value = true
  erro.value = null
  try {
    await userStore.loginWithGoogle()
  } catch (e) {
    erro.value = 'Não foi possível fazer login. Tente novamente.'
  } finally {
    carregando.value = false
  }
}
</script>

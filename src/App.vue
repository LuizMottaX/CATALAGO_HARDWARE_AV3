<template>
  <v-app>
    <v-app-bar v-if="userStore.isLoggedIn" color="primary" elevation="2">
      <v-app-bar-nav-icon @click="menuAberto = !menuAberto" />
      <v-icon class="ml-2 mr-2">mdi-memory</v-icon>
      <v-toolbar-title class="font-weight-bold">
        Catálogo de Hardware Usado
      </v-toolbar-title>

      <v-spacer />

      <v-menu location="bottom end">
        <template #activator="{ props }">
          <v-avatar
            v-bind="props"
            color="white"
            size="36"
            class="mr-3 cursor-pointer"
            style="border: 2px solid rgba(255,255,255,0.5)"
          >
            <v-img
              v-if="userStore.user?.photoURL"
              :src="userStore.user.photoURL"
              referrerpolicy="no-referrer"
              cover
            />
            <v-icon v-else color="primary">mdi-account</v-icon>
          </v-avatar>
        </template>

        <v-list min-width="200" rounded="lg">
          <v-list-item
            :subtitle="userStore.user?.email"
            :title="userStore.user?.displayName"
            lines="two"
          >
            <template #prepend>
              <v-avatar size="40">
                <v-img
                  v-if="userStore.user?.photoURL"
                  :src="userStore.user.photoURL"
                  referrerpolicy="no-referrer"
                  cover
                />
                <v-icon v-else>mdi-account</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
          <v-divider class="my-1" />
          <v-list-item
            prepend-icon="mdi-logout"
            title="Sair"
            @click="userStore.logout()"
          />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-if="userStore.isLoggedIn" v-model="menuAberto" temporary>
      <v-list>
        <v-list-item title="Catálogo de Hardware" subtitle="Menu de navegação" class="mb-2">
          <template #prepend>
            <v-icon color="primary">mdi-memory</v-icon>
          </template>
        </v-list-item>

        <v-divider />

        <v-list-item prepend-icon="mdi-home"                 title="Home"           to="/"         />
        <v-list-item prepend-icon="mdi-format-list-bulleted" title="Lista de Peças" to="/lista"    />
        <v-list-item prepend-icon="mdi-plus-circle"          title="Cadastrar Peça" to="/cadastro" />
        <v-list-item prepend-icon="mdi-information"          title="Sobre"          to="/sobre"    />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from './stores/user'

const menuAberto = ref(false)
const userStore = useUserStore()
</script>

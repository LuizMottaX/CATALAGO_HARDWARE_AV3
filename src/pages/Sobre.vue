<template>
  <v-container class="py-10" style="max-width: 700px;">
    <div class="text-center mb-8">
      <v-icon size="64" color="primary">mdi-account-group</v-icon>
      <h1 class="text-h4 font-weight-bold mt-3">Sobre o Projeto</h1>
    </div>

    <v-card rounded="lg" class="mb-4 pa-4">
      <v-card-title>
        <v-icon color="primary" class="mr-2">mdi-account</v-icon>
        Integrantes
      </v-card-title>
      <v-card-text>
        <p><strong>Aluno 1:</strong> ERIK ROBERTO DE S. MORAIS</p>
        <p><strong>Aluno 2:</strong> LUIZ HENRIQUE M. XAVIER</p>
      </v-card-text>
    </v-card>

    <v-card rounded="lg" class="pa-4">
      <v-card-title>
        <v-icon color="secondary" class="mr-2">mdi-information</v-icon>
        Sobre o App
      </v-card-title>
      <v-card-text>
        <p><strong>Tema:</strong> Catálogo de Hardware Usado</p>
        <p class="mt-2">
          Este aplicativo permite gerenciar um catálogo de peças de computador usadas.
          O usuário pode cadastrar, visualizar, editar e excluir itens como processadores,
          memórias e placas de vídeo. Os dados são mantidos em memória durante a sessão.
        </p>
        <p class="mt-2">
          <strong>Tecnologias utilizadas:</strong> Vue 3, Vite, Vuetify e Vue Router.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>


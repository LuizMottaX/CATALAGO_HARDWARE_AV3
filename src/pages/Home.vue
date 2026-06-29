<template>
  <v-container class="py-10">
    <div class="text-center mb-8">
      <v-icon size="72" color="primary">mdi-memory</v-icon>
      <h1 class="text-h3 font-weight-bold mt-3">Catálogo de Hardware Usado</h1>
      <p class="text-subtitle-1 mt-2 text-medium-emphasis">
        Gerencie peças de computador usadas de forma simples e rápida.
      </p>
    </div>

    <v-row class="mb-8" justify="center">
      <v-col cols="12" sm="4">
        <EstatisticasBox :total="totalItens" label="Total de Peças" />
      </v-col>
      <v-col cols="12" sm="4">
        <EstatisticasBox :total="itensTestados" label="Peças Testadas" />
      </v-col>
    </v-row>

    <div class="d-flex justify-center ga-4">
      <v-btn color="primary" size="large" to="/lista">
        <v-icon left>mdi-format-list-bulleted</v-icon>
        Ver Catálogo
      </v-btn>
      <v-btn color="secondary" size="large" to="/cadastro">
        <v-icon left>mdi-plus</v-icon>
        Cadastrar Peça
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { itens } from '../store/itens'
import EstatisticasBox from '../components/EstatisticasBox.vue'

const totalItens    = computed(() => itens.value.length)
const itensTestados = computed(() => itens.value.filter(i => i.testado).length)
</script>

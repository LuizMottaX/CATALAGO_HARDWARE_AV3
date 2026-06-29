<template>
  <!-- Componente de cartão de item - recebe dados via prop e emite eventos -->
  <v-card rounded="lg" class="mb-3" border>
    <v-card-title class="d-flex align-center ga-2">
      <v-icon color="primary">mdi-chip</v-icon>
      {{ item.nome }}
    </v-card-title>

    <v-card-text>
      <div><strong>Categoria:</strong> {{ item.categoria }}</div>
      <div><strong>Preço:</strong> R$ {{ item.preco.toFixed(2) }}</div>
      <div>
        <strong>Testado:</strong>
        <v-chip :color="item.testado ? 'success' : 'warning'" size="small" class="ml-1">
          {{ item.testado ? 'Sim' : 'Não' }}
        </v-chip>
      </div>
    </v-card-text>

    <v-card-actions>
      <!-- Emite o evento 'editar' com o item para o componente pai -->
      <v-btn color="primary" variant="tonal" @click="$emit('editar', item)">
        <v-icon left>mdi-pencil</v-icon> Editar
      </v-btn>
      <!-- Emite o evento 'excluir' com o id do item para o componente pai -->
      <v-btn color="error" variant="tonal" @click="$emit('excluir', item.id)">
        <v-icon left>mdi-delete</v-icon> Excluir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
// Recebe o objeto item inteiro via prop
defineProps({
  item: Object
})

// Declara os eventos que este componente pode emitir para o pai
defineEmits(['editar', 'excluir'])
</script>

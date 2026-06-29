import { ref } from 'vue'

const BASE = 'http://localhost:3001'

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const erro = await res.json().catch(() => ({ error: `Erro HTTP ${res.status}` }))
    throw new Error(erro.message || erro.error || `Erro ${res.status}`)
  }

  return res.json()
}

export const itens = ref([])

export async function carregarItens() {
  itens.value = await req('/items')
}

export async function salvar(item) {
  if (item.id) {
    await req(`/items/${item.id}`, { method: 'PUT', body: JSON.stringify(item) })
  } else {
    await req('/items', { method: 'POST', body: JSON.stringify(item) })
  }
  await carregarItens()
}

export async function excluir(id) {
  await req(`/items/${id}`, { method: 'DELETE' })
  itens.value = itens.value.filter(x => x.id !== id)
}

let itens = []
let proximoId = 1

itens.push({ id: proximoId++, nome: 'Placa de Vídeo GTX 1060', categoria: 'GPU', preco: 450, testado: true })
itens.push({ id: proximoId++, nome: 'Processador i5-8400',     categoria: 'CPU', preco: 280, testado: true })
itens.push({ id: proximoId++, nome: 'Memória RAM 8GB DDR4',    categoria: 'RAM', preco: 90,  testado: false })
itens.push({ id: proximoId++, nome: 'SSD 240GB Kingston',      categoria: 'SSD', preco: 110, testado: true })

export const getItems = (req, res) => {
  res.status(200).json(itens)
}

export const getItemById = (req, res) => {
  const id   = Number(req.params.id)
  const item = itens.find(i => i.id === id)

  if (!item) {
    return res.status(404).json({ error: 'Item não encontrado' })
  }

  res.status(200).json(item)
}

export const addItem = (req, res) => {
  console.log('📥 POST /items recebido:', req.body)
  const { nome, categoria, preco, testado } = req.body

  if (!nome || !categoria || preco === undefined) {
    return res.status(400).json({
      error: 'Dados inválidos',
      message: 'Os campos nome, categoria e preco são obrigatórios',
    })
  }

  const novoItem = {
    id:        proximoId++,
    nome:      String(nome).trim(),
    categoria: String(categoria).trim(),
    preco:     Number(preco),
    testado:   Boolean(testado ?? false),
  }

  itens.push(novoItem)

  res.status(201).json({
    msg:  `${novoItem.nome} cadastrado com sucesso`,
    item: novoItem,
  })
}

export const updateItem = (req, res) => {
  const id    = Number(req.params.id)
  const index = itens.findIndex(i => i.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Item não encontrado' })
  }

  itens[index] = { ...itens[index], ...req.body, id }

  res.status(200).json({
    msg:  'Item atualizado com sucesso',
    item: itens[index],
  })
}

export const deleteItem = (req, res) => {
  const id    = Number(req.params.id)
  const index = itens.findIndex(i => i.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Item não encontrado' })
  }

  const [removido] = itens.splice(index, 1)

  res.status(200).json({ msg: `${removido.nome} removido com sucesso` })
}

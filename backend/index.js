import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import itemRoutes from './routes/itemRoutes.js'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend do Catálogo de Hardware está rodando!' })
})

app.use('/items', itemRoutes)

app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

app.listen(PORT, () => {
  console.log(`\n✅ Backend rodando em http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/health`)
  console.log(`   Itens (protegido): http://localhost:${PORT}/items\n`)
})

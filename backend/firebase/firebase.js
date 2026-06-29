import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const keyPath    = join(__dirname, 'key.json')

const serviceAccount = JSON.parse(readFileSync(keyPath, 'utf-8'))

const adminApp = initializeApp({
  credential: cert(serviceAccount),
})

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Não autorizado',
      message: 'Token de autenticação ausente. Inclua o header: Authorization: Bearer <token>',
    })
  }

  const idToken = authHeader.split('Bearer ')[1]

  try {
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken)

    req.user = {
      uid:   decodedToken.uid,
      email: decodedToken.email,
      name:  decodedToken.name,
    }

    next()
  } catch (error) {
    console.error('Erro ao verificar token:', error.message)
    return res.status(403).json({
      error: 'Proibido',
      message: 'Token inválido ou expirado. Faça login novamente.',
    })
  }
}

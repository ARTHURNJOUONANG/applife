const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')

const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
const eventsRoutes = require('./routes/events')
const goalsRoutes = require('./routes/goals')
const moodRoutes = require('./routes/mood')
const focusRoutes = require('./routes/focus')
const aiRoutes = require('./routes/ai')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000



// Helmet ajoute des headers de sécurité automatiquement
app.use(helmet())

// CORS: web + mobile Capacitor (Android WebView utilise souvent https://localhost)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://life-os-platform.vercel.app',
  'https://localhost',
  'http://localhost',
  'capacitor://localhost',
  'ionic://localhost',
]

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL)
}

app.use(cors({
  origin(origin, callback) {
    // Certaines requêtes (curl/health checks/clients natifs) n'ont pas d'Origin.
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error(`Origin non autorisée par CORS: ${origin}`))
  },
  credentials: true,
}))

// Permet à Express de lire le JSON envoyé par le frontend
app.use(express.json())

// Morgan affiche chaque requête dans le terminal
app.use(morgan('dev'))

// -----------------------------------
// ROUTES
// -----------------------------------

app.use('/api/auth', authRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/goals', goalsRoutes)
app.use('/api/mood', moodRoutes)
app.use('/api/focus', focusRoutes)
app.use('/api/ai', aiRoutes)

// -----------------------------------
// ROUTE DE TEST
// -----------------------------------

// Cette route sert uniquement à vérifier que le serveur fonctionne
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Life OS API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
})

// -----------------------------------
// GESTION DES ERREURS
// -----------------------------------

// Cette fonction intercepte toutes les erreurs de l'application
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Erreur interne du serveur',
    code: err.code || 'INTERNAL_ERROR'
  })
})

// -----------------------------------
// DÉMARRAGE DU SERVEUR
// -----------------------------------

const { execSync } = require('child_process')

if (require.main === module) {
  app.listen(PORT, async () => {
    console.log(`✓ Serveur démarré sur le port ${PORT}`)
    console.log(`✓ Environnement : ${process.env.NODE_ENV}`)
    console.log(`✓ URL : http://localhost:${PORT}/api/health`)

    if (process.env.NODE_ENV === 'production') {
      try {
        console.log('✓ Lancement des migrations Prisma...')
        execSync('npx prisma migrate deploy', { stdio: 'inherit' })
        console.log('✓ Migrations appliquées avec succès')
      } catch (error) {
        console.error('✗ Erreur lors des migrations:', error.message)
      }
    }
  })
}

module.exports = app
// Init PORT
process.env.PORT = process.env.PORT || 3000

// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// Postgres uri
process.env.DBURL = process.env.NODE_ENV == 'development' ? 'postgres://postgres:password@localhost:5432/node_challenge_development' : process.env.DBURL

// JWT Expiration date
process.env.JWT_EXDATE = '192h'

// APP secret Key
process.env.APP_SECRET_KEY = process.env.APP_SECRET_KEY || 'app-secret-key'
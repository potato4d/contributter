const package = require('./package.json')

const defaultConfig = {
  type: process.env.DATABASE_DRIVER || 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_DATABASE || `${package.name}`,
  synchronize: false,
  logging: !!+process.env.DATABASE_LOGGING || true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}

const productionConfig = {
  type: process.env.DATABASE_DRIVER || 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_DATABASE || `${package.name}`,
  synchronize: false,
  logging: !!+process.env.DATABASE_LOGGING || true,
  entities: ['build/src/entity/**/*.js'],
  migrations: ['build/src/migration/**/*.js'],
  subscribers: ['build/src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'build/src/entity',
    migrationsDir: 'build/src/migration',
    subscribersDir: 'build/src/subscriber'
  }
}

const testConfig = {
  type: process.env.DATABASE_DRIVER || 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_DATABASE || `${package.name}-test`,
  synchronize: true,
  logging: !!+process.env.DATABASE_LOGGING || false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}

let c = defaultConfig

if (process.env.NODE_ENV === 'test') {
  c = testConfig
}

if (process.env.NODE_ENV === 'production') {
  c = productionConfig
}

module.exports = c

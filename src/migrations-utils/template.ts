import { getMongoConnection } from '../migrations-utils/db'

export const up = async () => {
  const db = await getMongoConnection()
}

export const down = async () => {
  const db = await getMongoConnection()
}

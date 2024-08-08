import { MongoClient } from 'mongodb'
import { environment } from '../configs/environment'

const MONGO_URL = `mongodb://${environment.mongo.userName}:${environment.mongo.password}@${environment.mongo.host}:${environment.mongo.port}`

export const getMongoConnection = async () => {
  const client = await MongoClient.connect(MONGO_URL)
  return client.db()
}

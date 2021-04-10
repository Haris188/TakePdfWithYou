
import * as dotenv from 'dotenv'
import TestDbAccess from './TestDbAccess'
import MongoDbAccess from './MongoDbAccess'

dotenv.config()
const datastore = MongoDbAccess

export default datastore
export * as mockFailedDbResponses from './mockFailedDbResponses'
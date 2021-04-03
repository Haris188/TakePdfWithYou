
import * as dotenv from 'dotenv'
import TestDbAccess from './TestDbAccess'

dotenv.config()
const datastore = TestDbAccess

export default datastore
export * as mockFailedDbResponses from './mockFailedDbResponses'
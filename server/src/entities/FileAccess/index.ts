
import * as dotenv from 'dotenv'
import TestFileAccess from './TestFileAccess'
import FirestoreAccess from './FirestoreAccess'

dotenv.config()
const fileAccess = FirestoreAccess

export default fileAccess
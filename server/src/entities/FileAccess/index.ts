
import * as dotenv from 'dotenv'
import TestFileAccess from './TestFileAccess'
import FirestoreAccess from './FirestoreAccess'

dotenv.config()
const fileAccess:any = process.env.NODE_ENV ==='test'
? TestFileAccess
: FirestoreAccess

export default fileAccess
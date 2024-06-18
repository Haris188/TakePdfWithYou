
import * as dotenv from 'dotenv'
import TestFileAccess from './TestFileAccess'
// import FirestoreAccess from './FirestoreAccess'
import S3Access from './S3Access'

dotenv.config()
const fileAccess:any = process.env.NODE_ENV ==='test'
? TestFileAccess
: S3Access


export default fileAccess
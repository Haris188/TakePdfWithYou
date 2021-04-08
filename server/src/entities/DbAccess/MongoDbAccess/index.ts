import DbAccess from "../DbAccess";
import UserSchema from './UserSchema'
import PdfSchema from './PdfSchema'

const MongoStore: DbAccess = {
    Users: new UserSchema(),
    Pdfs: new PdfSchema()
}

export default MongoStore
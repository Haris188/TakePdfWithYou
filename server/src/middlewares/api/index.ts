import installLogin from './login'
import installRegister from './register'
import installAuthBoundary from './authBoundary'
import installGetPdfsInfo from './getPdfsInfo'
import installUploadPdf from './uploadPdf'
import installGetCurrentUser from './getCurrentUser'
import installSaveBookmark from './saveBookmark'

export default (app)=>{
    installRegister(app)
    installLogin(app)
    
    installAuthBoundary(app)

    installGetPdfsInfo(app)
    installUploadPdf(app)
    installGetCurrentUser(app)
    installSaveBookmark(app)
}
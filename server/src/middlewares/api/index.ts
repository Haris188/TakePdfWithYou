import installLogin from './login'
import installRegister from './register'
import installAuthBoundary from './authBoundary'
import installGetPdfsInfo from './getPdfsInfo'
import installUploadPdf from './uploadPdf'

export default (app)=>{
    installRegister(app)
    installLogin(app)
    
    installAuthBoundary(app)

    installGetPdfsInfo(app)
    installUploadPdf(app)
}
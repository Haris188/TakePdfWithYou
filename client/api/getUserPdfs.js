
import request from './request'

const getUserPdfs = async ()=>{
    const res = await request.get('/pdfs-info')
    return res
}

export default getUserPdfs
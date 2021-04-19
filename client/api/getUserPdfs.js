
import request from './request'

const getUserPdfs = async ()=>{
    const res = await request.get('/pdfs-info')
    console.log(res)
    return res
}

export default getUserPdfs
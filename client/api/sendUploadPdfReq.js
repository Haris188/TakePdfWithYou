import request from "./request"

const sendUploadPdfReq = async (fileData)=>{
    const res = await request.post('/upload-pdf',fileData)
    return res
}

export default sendUploadPdfReq
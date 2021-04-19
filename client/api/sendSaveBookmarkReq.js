import request from "./request"

const sendSaveBookmarkReq = async (data)=>{
    const res = await request.post('/save-bookmark', data)
    return res
}

export default sendSaveBookmarkReq
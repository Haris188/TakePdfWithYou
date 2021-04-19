import request from "./request"

const sendSignUpReq = async (cred)=>{
    const res = await request.post('/register', cred)
    return res
}

export default sendSignUpReq
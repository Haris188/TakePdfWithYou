import request from './request'

const storeAPITokenToLocalStore = (token)=>{
    localStorage.setItem('jwtToken', token)
}

const sendSignInReq = async (email, password)=>{
    const res = await request.post('/login', {email, password})

    if(!res)
    return {res:{error: 'Got null from axios'}}

    storeAPITokenToLocalStore(res.token)

    return res
}

export default sendSignInReq
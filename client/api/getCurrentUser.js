import request from './request'

const getCurrentUser = async ()=>{
    const res =  await request.get('/current-user')
    return res
}

export default getCurrentUser
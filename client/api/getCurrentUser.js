import request from './request'

const getCurrentUser = async ()=>{
    const res =  await request.get('/current-user')
    console.log(res)
    return res
}

export default getCurrentUser
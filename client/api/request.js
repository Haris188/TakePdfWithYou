import axios from 'axios'

export const post = async (path, payload)=>{
    const authToken = localStorage.getItem('jwtToken')
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}${path}` ,
            payload,
            {
                headers:{
                    'Authorization': `Bearer ${authToken}` 
                }
            }
        )

        return res.data
    } catch (error) {
        console.log('AXIOS REQUEST FAILED')
        console.log(error)
        return {error: 'axios failed'}
    }
}

export const get = async (path)=>{
    const authToken = localStorage.getItem('jwtToken')
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`,
            {
                headers:{
                    'Authorization': `Bearer ${authToken}` 
                }
            }
        )

        return res.data
    } catch (error) {
        console.log('AXIOS SIGN IN FAILED')
        console.log(error)
        return {error: 'axios failed'}
    }
}

const request = {
    post,
    get
}

export default request
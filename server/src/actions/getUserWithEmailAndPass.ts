import User from "../entities/User"

export default async (email, password)=>{
    try{
        const user = await User.getFromDbWithEmailAndPass(email, password)
        return user.getInfo()
    }
    catch(e){
        console.log('COULD NOT FETCH A USER WITH EMAIL AND PASSWORD')
        console.log(e)
        return {error:'Could not fetch a user with email and password'}
    }
}
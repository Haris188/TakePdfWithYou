import User from "../entities/User"

export default async (userId:string, password: string)=>{
    try{
        const user = User.createFromData({id:userId, password})
        return user.changePassword(password)
    }
    catch(e){
        console.log('FAILED TO CHANGE THE PASSWORD')
        console.log(e)
        return {error: 'Failed to change the password'}
    }
}
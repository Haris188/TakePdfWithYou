
import User, {UserDataType} from '../entities/User'

export default async (userData: UserDataType)=>{
    try{
        const newUser = User.createFromData(userData)
        const res = await newUser.register()
        return res
    }
    catch(e){
        console.log('USER REGISTRATION FAILED')
        console.log(e)
        return {error: 'Failed user registration'}
    }
}
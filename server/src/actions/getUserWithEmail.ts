
import User from '../entities/User'

export default async (email:string)=>{
    const user = await User.getWhere({email})
    return user.getInfo()
}
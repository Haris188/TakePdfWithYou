import User from "../entities/User"

export default async (userId)=>{
    const user = await User.createFromData({id: userId})
    return await user.getAllPdfs()
}
import User from "../entities/User"

export default async (id:string)=>{
    try {
        const user = User.createFromData({id})
        return await user.getFromDb()
    } catch (error) {
        console.log('FAILED TO GET USER WITH ID')
        console.log(error)
        return null
    }
}
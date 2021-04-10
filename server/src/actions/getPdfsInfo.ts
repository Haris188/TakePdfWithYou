import User from "../entities/User"

export default async (userId)=>{
    try {
        const user = User.createFromData({id: userId})
    return await user.getAllPdfs()
    } catch (error) {
        console.log('FAILED TO GET PDFS INFO')
        console.log(error)
        return {error: 'Failed to get pdfs info'}
    }
}
import FileAccess from "../entities/FileAccess"
import User from '../entities/User'
import Pdf from '../entities/Pdf'
import FileDataType from "../entities/Pdf/FileDataType"

export default async(file)=>{
    try{
        const pdf:Pdf = Pdf.createFromData(file)
        const {downloadLink} = await pdf.upload()

        const thisUser:User = User.createFromData({id: file.meta.userId})
        
        return thisUser.addNewPdfInfo({
            id: file.meta.fileId,
            name: file.meta.filename,
            downloadLink,
            userId: file.meta.userId
        })
    }
    catch(e){
        console.log('FAILED TO UPLOAD FILE')
        console.log(e)
        return {error: 'failed to upload file'}
    }
}
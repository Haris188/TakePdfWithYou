import FileAccess from "../entities/FileAccess"

export default async(file)=>{
    const {meta} = file

    try{
        return await FileAccess
        .setDir(meta.userId)
        .uploadFile(file)
    }
    catch(e){
        console.log('FAILED TO UPLOAD FILE')
        console.log(e)
        return null
    }
}
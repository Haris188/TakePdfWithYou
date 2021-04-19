import Pdf from "../entities/Pdf"

export default async (userId:string, pdfId: string, payload: string)=>{
    try {
        const pdf = await Pdf.createFromData({id: pdfId})
        return await pdf.saveBookmark(userId,payload)
    } catch (e) {
        console.log('FAILED TO SAVE BOOKMARK')
        console.log((e))
        return {error: 'Failed to save bookmard'}
    }
}
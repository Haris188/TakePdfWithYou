import Pdf from "../entities/Pdf"

export default async (userId:string, pdfId: string, pageNumber: string)=>{
    try {
        const pdf = await Pdf.getUsingId({id: pdfId})
        return await pdf.saveBookmark(userId,pageNumber)
    } catch (e) {
        console.log('FAILED TO SAVE BOOKMARK')
        console.log((e))
        return {error: 'Failed to save bookmard'}
    }
}
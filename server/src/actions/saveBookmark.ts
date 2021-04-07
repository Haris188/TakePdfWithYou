import Pdf from "../entities/Pdf"

export default async (pdfId: string, pageNumber: string)=>{
    try {
        const pdf = await Pdf.getUsingId({id: pdfId})
        return await pdf.saveBookmark(pageNumber)
    } catch (e) {
        console.log('FAILED TO SAVE BOOKMARK')
        console.log((e))
        return null
    }
}
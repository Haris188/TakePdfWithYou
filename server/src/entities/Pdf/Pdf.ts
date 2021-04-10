import DbAccess from '../DbAccess'
import FileAccess from '../FileAccess'
import FileDataType, { PdfType } from './FileDataType'


export default class {
    private file: any

    constructor(file: FileDataType|PdfType){
        this.file = file
    }

    public static createFromData(file:any){
        return new this(file)
    }

    public static async getUsingId(pdfData:PdfType){
        const pdf = await DbAccess.Pdfs.getWhere({id: pdfData.id})
        if(pdf[0]){
            return new this(pdf[0])
        }
        else{
            throw new Error('Cant fetch the PDF. It might not exist')
        }
    }

    public async saveBookmark(userId:string, page: string){
        return await DbAccess.Pdfs.updateWhere(
            userId,
            {id: this.file.id}, 
            {bookmark: page}
        )
    }

    public async upload(){
        return await FileAccess
        .setDir(this.file.meta.userId)
        .uploadFile(this.file)
    }
}

export default interface FileDataType{
    meta: {
        userId: string,
        fileId: string,
        filename: string 
    }
    file: Object
}

export interface PdfType {
    id?: string
    downloadLink?: string
    bookmark?:string
}
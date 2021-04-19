
export default interface FileDataType{
    meta: {
        userId: string,
        fileId: string,
        filename: string,
        mimeType: string 
    }
    file: any
}

export interface PdfType {
    id?: string
    name?:string
    downloadLink?: string
    bookmark?:string
    read?: string
}
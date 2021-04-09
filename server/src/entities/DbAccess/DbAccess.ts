import FileDataType, {PdfType} from "../Pdf/FileDataType";
import { UserDataType } from "../User";

export default interface DbAccess {
    Users: UserAccessSchema
    Pdfs: PdfAccessSchema
}

export interface UserAccessSchema {
    get(where?: UserDataType): Promise<UserDataType[]>
    store(data: UserDataType): Promise<{id:string}>
    updateWhere(where: UserDataType, data: UserDataType): Promise<string>
    resetDataStore():void //only for testing
}

export interface PdfAccessSchema {
    appendPdf(pdfInfo:{id:string, downloadLink:string, bookmark}, userId:string): Promise<{id:string}>
    getWhere(where: PdfType): Promise<PdfType[]>
    updateWhere(userId:string, where: PdfType, data:PdfType): Promise<string>
}
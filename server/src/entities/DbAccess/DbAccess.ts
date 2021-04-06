import FileDataType from "../Pdf/FileDataType";
import { UserDataType } from "../User";

export default interface DbAccess {
    Users: UserAccessSchema
}

export interface UserAccessSchema {
    get(where: UserDataType): Promise<UserDataType[]>
    store(data: UserDataType): Promise<{id:string}>
    updateWhere(where: UserDataType, data: UserDataType): Promise<{id:string}>
    appendPdf(pdfInfo:{id:string, downloadLink:string, userId}): Promise<{id:string}>
    resetDataStore():void //only for testing
}
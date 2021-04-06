
export interface UserDataType{
    id?: string
    name?: string
    email?: string
    password?: string
    pdfs?: Array<{id:string, downloadLink:string}>
}

export interface UserDataType{
    id?: string
    name?: string
    email?: string
    password?: string
    pdfs?: {
        id?:string, 
        downloadLink?:string,
        bookmark?: string
    }[]
}
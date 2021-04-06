
export default interface FileAccess{
    getFile(fileName:string): Promise<any>
    uploadFile(file:any): Promise<{downloadLink:string}>
}
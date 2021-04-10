
export default interface FileAccess{
    uploadFile(file:any): Promise<{downloadLink:string}>
}
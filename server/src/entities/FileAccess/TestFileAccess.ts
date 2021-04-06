import FileAccess from './FileAccess'
import FileDataType from '../Pdf/FileDataType'

export default class TestFileAccess implements FileAccess{
    private path: string

    constructor(path:string){
        this.path = path
    }

    public static setDir(path:string){
        return new this(path)
    }

    public async getFile(fileName:string){
        return new File([], `${fileName}.pdf`)
    }

    public async uploadFile(file: FileDataType){
        return {downloadLink: 'download'}
    }
}
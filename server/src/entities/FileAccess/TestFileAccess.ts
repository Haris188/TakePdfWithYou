import FileAccess from './FileAccess'

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

    public async uploadFile(file){
        return file
    }
}
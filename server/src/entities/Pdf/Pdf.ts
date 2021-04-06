
import FileAccess from '../FileAccess'
import FileDataType from './FileDataType'


export default class {
    private file:FileDataType

    constructor(file: FileDataType){
        this.file = file
    }

    public static createFromData(file:FileDataType){
        return new this(file)
    }

    public async upload(){
        return await FileAccess
        .setDir(this.file.meta.userId)
        .uploadFile(this.file)
    }
}
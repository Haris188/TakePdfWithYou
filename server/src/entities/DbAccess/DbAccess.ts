import { UserDataType } from "../User";

export default interface DbAccess {
    Users: UserAccessSchema
}

export interface UserAccessSchema {
    get(where: UserDataType): Promise<UserDataType[]>
    store(data: UserDataType): Promise<{id:string}>
    updateWhere(where: UserDataType, data: UserDataType): Promise<{id:string}>
    resetDataStore():void //only for testing
}
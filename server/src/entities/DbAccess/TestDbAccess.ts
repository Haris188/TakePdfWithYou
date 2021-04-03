
import { UserDataType, mockUserData } from '../User'
import DbAccess, {UserAccessSchema} from './DbAccess'

class UserSchema implements UserAccessSchema{
    private dataStore = {
        users: [
            mockUserData.def
        ]
    }

    public async get(where: UserDataType){
        return this.dataStore.users
    }

    public async store(data: UserDataType){
        this.dataStore.users.push(data)
        return {id: this.dataStore.users[1].id}
    }
}

const TestDbAccess: DbAccess = {
    Users: new UserSchema()
}

export default TestDbAccess
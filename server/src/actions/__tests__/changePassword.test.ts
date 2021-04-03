import actions from ".."
import DbAccess from '../../entities/DbAccess'
import { mockUserData } from "../../entities/User"

const userId = '1'
const password = 'testpassword'

describe('actions.changePassword', ()=>{
    it('should change password in database on success', async ()=>{
        await actions.changePassword(userId, password)
        const user = await DbAccess.Users.get({id:userId})

        expect(user[0]).toBeDefined()
        expect(user[0].password).toBe(password)
    })

    it('should return not store password on failure', async ()=>{
        actions.changePassword = jest.fn(async ()=>null)
        DbAccess.Users.resetDataStore()
        await actions.changePassword(userId, password)
        const user = await DbAccess.Users.get({id:userId})
        
        expect(user[0]).toBeDefined()
        expect(user[0].password).not.toBe(password)
    })
})
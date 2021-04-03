
import actions from '..'
import { UserDataType } from '../../entities/User'
import DbAccess, {mockFailedDbResponses} from '../../entities/DbAccess'
import {mockUserData as mockUser} from '../../entities/User'

describe('registerUser', ()=>{
    describe('on Success', ()=>{
        it('should store user data to DataStore', async ()=>{
            await actions.registerUser(mockUser.def)
            const res = await DbAccess.Users.get(mockUser.def)
            expect(res).toBeDefined()
            expect(res.length).toBeGreaterThan(0)
            expect(res[0]).toMatchObject(mockUser.def)
        })
    })
})

describe('On Failure', ()=>{
    it('should not store the user data to Datastore', async ()=>{
        DbAccess.Users.get = jest.fn(async ()=>mockFailedDbResponses.get)
        await actions.registerUser(mockUser.def)
        const res = await DbAccess.Users.get(mockUser.def)
        expect(res).toBeDefined()
        expect(res).toHaveLength(0)
    })
})
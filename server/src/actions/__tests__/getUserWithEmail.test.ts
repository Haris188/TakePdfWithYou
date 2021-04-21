import actions from ".."
import {mockUserData} from '../../entities/User'

const {email} = mockUserData.def

describe('Actions.getUserWithEmailAndPass', ()=>{
    describe('On Success', ()=>{
        it('should return an user response', async ()=>{
            const res = await actions.getUserWithEmail(email)
            expect(res).toBeDefined()
            expect(res).toBe(mockUserData.def)
        })
    })

    describe('On Failure', ()=>{
        it('should return null', async ()=>{
            actions.getUserWithEmail = jest.fn(async ()=>null)
            const res = await actions.getUserWithEmail(email)
            expect(res).toBeDefined()
            expect(res).toBeNull()
        })
    })
})
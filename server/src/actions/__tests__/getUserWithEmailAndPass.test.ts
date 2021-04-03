import actions from ".."
import {mockUserData} from '../../entities/User'

const {email, password} = mockUserData.def

describe('Actions.getUserWithEmailAndPass', ()=>{
    describe('On Success', ()=>{
        it('should return an user response', async ()=>{
            const res = await actions.getUserWithEmailAndPass(email, password)
            expect(res).toBeDefined()
            expect(res).toMatchObject(mockUserData.def)
        })
    })

    describe('On Failure', ()=>{
        it('should return null', async ()=>{
            actions.getUserWithEmailAndPass = jest.fn(async ()=>null)
            const res = await actions.getUserWithEmailAndPass(email, password)
            expect(res).toBeDefined()
            expect(res).toBeNull()
        })
    })
})

import User, {mockUserData} from ".."

describe('User.register', ()=>{
    describe('on success', ()=>{
        it('should return the id of the registerd user', async ()=>{
            const user = User.createFromData(mockUserData.def)
            const res = await user.register()
            expect(res).toBeDefined()
            expect(res).toMatchObject({id: mockUserData.def.id})
        })
    })

    describe('on failure',  ()=>{
        it('should return null', async ()=>{
            const user = User.createFromData(mockUserData.def)
            user.register = jest.fn(async ()=>mockUserData.failedRegister)
            const res = await user.register()
            expect(res).toBeDefined()
            expect(res).toBeNull()
        })
    })
})
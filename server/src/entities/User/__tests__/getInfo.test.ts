import User, { mockUserData } from ".."

describe('User.getInfo', ()=>{
    describe('On Success', ()=>{
        it('should return user info the object has', ()=>{
            const user = User.createFromData(mockUserData.def)
            const userInfo = user.getInfo()
            expect(userInfo).toBeDefined()
            expect(userInfo).toMatchObject(mockUserData.def)
        })
    })

    describe('On Failure', ()=>{
        it('should return user info the object has', ()=>{
            const user = User.createFromData(undefined)
            const userInfo = user.getInfo()
            expect(userInfo).toBeDefined()
            expect(userInfo).toBeNull()
        })
    })
})
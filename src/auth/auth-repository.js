import { prisma } from "../app/db.js"

const checkUserExist = async (email) => {
    await prisma.user.findFirst({
        where:{
            email,
        },
        select:{
            password:true,
            id: true
        }
    })
}

const createNewUser = async (newUserData) => {
    const create = await prisma.user.create({
        data:{
            email: newUserData.email,
            password: newUserData.password,
            username: newUserData.username,
            phone: parseInt(newUserData.phone)
        }
    })
    return create
}

export {
    checkUserExist,
    createNewUser
}
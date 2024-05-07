import { prisma } from "../app/db.js"

const checkUserExist = async (email) => {
    const check = await prisma.user.findFirst({
        where:{
            email,
        },
        select: {
            id: true,
            email: true,
            password: true
        }
    })

    return check
}

const createNewUser = async (newUserData) => {
    const create = await prisma.user.create({
        data:{
            email: newUserData.email,
            password: newUserData.password,
            username: newUserData.username
        }
    })

    return create
}

const addRefreshTokenUser = async (id, refreshToken) => {
    const addToken = await prisma.user.update({
        where:{
            id
        },
        data:{
            refresh_token: refreshToken
        }
    })
}

export {
    checkUserExist,
    createNewUser,
    addRefreshTokenUser
}

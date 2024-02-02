import { compare, genSalt, hash } from 'bcryptjs';


const SALT_RANDOMS = 8;


const hashPassword = async (password: string) => {
    return await hash(password, (await genSalt(SALT_RANDOMS)));
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
};


export const PasswordEncrypt = {
    hashPassword,
    verifyPassword
};
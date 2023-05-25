import { compare, genSalt, hash } from "bcryptjs";


const hashPassword = async (passado: string) => {

  const salt = await genSalt(8)
  return await hash(passado, salt);
}
const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
}

export const PasswordCrypto = { hashPassword, verifyPassword }
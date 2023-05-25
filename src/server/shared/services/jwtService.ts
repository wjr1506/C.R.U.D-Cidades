import * as jwt from 'jsonwebtoken'

interface IJwtData {
  uid: number
}

const sing = (data: IJwtData): string | 'JWT_SECRET NOT FOUND' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET NOT FOUND';

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24 h' })
}

const verify = (token: string): IJwtData | 'JWT_SECRET NOT FOUND' | 'INVALID_TOKEN' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET NOT FOUND';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }
    return decoded as IJwtData
  } catch (e) {
    return 'INVALID_TOKEN';
  }

}
export const jwtService = { sing, verify }
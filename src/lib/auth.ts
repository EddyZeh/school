import jwt from 'jsonwebtoken';

const secret = "cb3118584851941a8002ba20c8e51d3d5badd87d9573bf1d2c6c687d4e29eed9"!;

export function generateToken(payload: object) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, secret);
}

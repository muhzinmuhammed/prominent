import jwt from 'jsonwebtoken';
import 'dotenv/config'

const generateToken = (user_id: string) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });

  return token;
};

export default generateToken;

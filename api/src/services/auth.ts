import { NotFoundError } from '../apiErrors/apiErrors';
import jwt from 'jsonwebtoken';
import Users, { UserType } from '../models/Users';

const secret = 'oeriuhwlieruhwleiruhlieugh%&"####';

const signUp = async (newUser: UserType) => {
  const result = await Users.create({
    userName: newUser.userName,
    phone: newUser.phone,
    password: newUser.password,
  });
  const token = jwt.sign({ phone: result.phone, id: result._id }, secret);

  const signInName = result.userName;
  const admin = result.isAdmin;
  const _id = result._id;
  return { signInName, admin, token, _id };
};


const signIn = async (existingUser: UserType) => {

  const token = jwt.sign({ phone: existingUser.phone, id: existingUser._id }, secret, {
    expiresIn: '24h',
  });

  const signInName = existingUser.userName;
  const admin = existingUser.isAdmin;
  const _id = existingUser._id;
  return { signInName, admin, token, _id };
};

export default {
  signUp,
  signIn
};

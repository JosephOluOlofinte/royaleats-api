import User from '../models/user.model';
// import VerificationCode from '../models/verificationCode.model';
// import VerificationCodeType from '../types_and_interfaces/verificationCode.type';
import createAccountTypes from '../types_and_interfaces/createAccount.types';
// import Session from '../models/session.model';

export const createAccount = async (userData: createAccountTypes) => {

  // verify that email doesn't exist
  const existingUser = await User.exists({ email: userData.email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // create the user
  const newUser = new User({
    name: userData?.name,
    email: userData.email,
    password: userData?.password,
  });
  newUser.save();

  // verification code
  // const verificationCode = await VerificationCode.create({
  //   userId: newUser._id,
  //   type: VerificationCodeType.EMAIL_VERIFICATION,
  //   expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  // });

  // send verification email

  // create session
  // const session = await Session.create({
  //   userId: newUser._id,
  //   userAgent: userData?.userAgent,
  // })


  // sign access and refresh tokens

  // return new user
  return newUser;
};

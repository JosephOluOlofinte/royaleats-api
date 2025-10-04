import bcrypt from 'bcrypt';

export const hashValue = async (value: string, saltRounds?: number) => 

bcrypt.hash(value, saltRounds || 10);


export const compareValues = async (value: string, hashedvalue: string) =>
  bcrypt.compare(value, hashedvalue).catch(() => false);
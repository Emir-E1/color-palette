import bcrypt from "bcryptjs";

// make a hashing function

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function hashCompare(passwordHashed, hash) {
  const compare = await bcrypt.compare(passwordHashed, hash);
  return compare;
}

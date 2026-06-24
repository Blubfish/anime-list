"use server";

export async function checkPassword(password: string) {
  return password === process.env.EDIT_PASSWORD;
}

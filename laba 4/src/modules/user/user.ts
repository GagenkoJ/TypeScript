export const userName: string = "Марія";
export const userAge: number = 21;
export const isStudent: boolean = true;

export function describeUser(
  name: string,
  age: number,
  student: boolean
): string {
  const status: string = student ? "студент(ка)" : "не студент(ка)";
  return `Користувач: ${name}, вік: ${age}, статус: ${status}.`;
}

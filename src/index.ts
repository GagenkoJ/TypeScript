const userName: string = "Марія";
const userAge: number = 21;
const isStudent: boolean = true;

function describeUser(name: string, age: number, student: boolean): string {
  const status = student ? "студент(ка)" : "не студент(ка)";
  return `Користувач: ${name}, вік: ${age}, статус: ${status}.`;
}

console.log(describeUser(userName, userAge, isStudent));
#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const person = new Person();
const programStart = async (person) => {
    do {
        console.log(chalk.red(`         ******************  WELCOME!      **********************`));
        const answer = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Whom would you like to interact with? ",
            choices: ["Staff", "Student", "Exit"],
        });
        if (answer.select === "Staff") {
            console.log(chalk.yellow("You approach the staff room. Please feel free to ask any question.\n"));
        }
        else if (answer.select === "Student") {
            let studentAnswer = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the student's name you want to interact with: ",
            });
            const student = person.students.find((value) => value.name === studentAnswer.student);
            if (!student) {
                const newStudent = new Student(studentAnswer.student);
                person.addStudent(newStudent);
                console.log(chalk.bgRed(`\nHello, I am ${newStudent.name}. Nice to meet you!`));
                console.log(chalk.bgMagentaBright("\nNew student added:"));
            }
            else {
                console.log(chalk.bgCyan(`\nHello, I am ${student.name}. Nice to see you again.`));
            }
            console.log(chalk.bgBlue(`\nCurrent Students list:`));
            person.students.forEach(s => {
                console.log(chalk.blue(s.name));
            });
        }
        else if (answer.select === "Exit") {
            console.log(chalk.redBright("\nExiting the program...\t \t \t \t"));
            process.exit();
        }
    } while (true);
};
programStart(person);

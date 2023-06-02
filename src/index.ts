#!/usr/bin/env node

import inquirer from 'inquirer';

let balance = Math.ceil(Math.random() * 10000);
let username: string;
let password: string;
let options: string;
let amount: number;
let condition = true;

const login = async () => {
  const loginQuestions = await inquirer.prompt([
    {
      name: "username",
      type: "input",
      message: "Enter User Name: ",
    },
    {
      name: "password",
      type: "password",
      message: "Enter Password: ",
    },
  ]);

  username = loginQuestions.username;
  password = loginQuestions.password;
};

const selectOption = async () => {
  const selection = await inquirer.prompt({
    name: "option",
    type: "list",
    message: "Select",
    choices: ["Withdraw", "Deposit", "About", "Exit"],
  });

  options = selection.option;
};

const takeAmount = async () => {
  const givenAmount = await inquirer.prompt({
    name: "enteredAmount",
    type: "input",
    message: "Enter Amount: ",
    validate: (input: string) => {
      const isValid = /^\d+$/.test(input); // Check if input contains only digits
      return isValid ? true : "Please enter a valid numeric amount";
    },
  });

  amount = parseInt(givenAmount.enteredAmount);
};

const withdraw = () => {
  if (amount > 0 && amount <= balance) {
    if (!isVowel(username)) {
      amount += 500;
      console.log("Extra $500 charged for non-vowel user.");
    }
    balance -= amount;
    console.log("Amount withdrawn: ", amount);
    console.log("Your New Balance is: ", balance);
  } else {
    console.log("Invalid amount");
  }
};

const deposit = () => {
  if (amount > 0) {
    balance += amount;
    console.log("Amount Deposited: ", amount);
    console.log("Your New Balance is: ", balance);
    if (amount >= 5000) {
      balance += 1000;
      console.log("Congratulations! You have been rewarded $1000 for depositing a large amount.");
      console.log("Your New Balance (including reward): ", balance);
    }
  } else {
    console.log("Invalid amount");
  }
};

const isVowel = (character: string): boolean => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.includes(character.toLowerCase());
};

const runATM = async () => {
  while (true) {
    await login();
    if (password === "admin") {
      break;
    } else {
      console.log("Wrong UserName OR Password");
    }
  }

  console.log("WELCOME TO SHAYAN ATM");

  while (condition) {
    await selectOption();

    switch (options) {
      case "Withdraw":
        console.log("Your Current Account Balance is: ", balance);
        await takeAmount();
        withdraw();
        break;

      case "Deposit":
        await takeAmount();
        deposit();
        break;

      case "About":
        console.log("Your Name: ", username);
        console.log("Your Account Balance: ", balance);
        break;

      case "Exit":
        condition = false;
        break;

      default:
        break;
    }
  }
};

runATM();

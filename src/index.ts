#!/usr/bin/env node

import inquirer from 'inquirer';

var Balance = Math.ceil(Math.random() * 10000)
let Username: string;
let Password: string;
let Options: string;
let Amount: number;
let condition: boolean = true;

const Login = async () => {
  let LoginQuestions = await inquirer.prompt([
    {
      name: "Username",
      type: "string",
      message: "Enter User Name: ",
    },
    {
      name: "Password",
      type: "password",
      message: "Enter Password: ",
    },
  ]);
  Username = LoginQuestions.Username
  Password = LoginQuestions.Password
}

const Opt = async () => {
  let Selection = await inquirer.prompt(
    {
      name: "Options",
      type: "list",
      message: "Select",
      choices: ["Withdraw", "Deposit", "About", "Exit"],
    }
  )
  Options = Selection.Options;
}

const takeAmount = async () => {
  let givenAmount = await inquirer.prompt({
    name: "enteredAmount",
    type: "input",
    message: "Enter Amount: ",
    validate: function (input: string) {
      const isValid = /^\d+$/.test(input); // Check if input contains only digits
      return isValid ? true : "Please enter a valid numeric amount";
    },
  });
  Amount = parseInt(givenAmount.enteredAmount);
}

const Withdraw = (Amount: number): void => {
  if (Amount > 0 && Amount <= Balance) {
    Balance -= Amount;
    console.log("Amount withdrawn: ", Amount);
    console.log("Your New Balance is: ", Balance);
  } else {
    console.log("Invalid amount");
  }
}

const Deposit = (Amount: number): void => {
  if (Amount > 0) {
    Balance += Amount;
    console.log("Amount Deposited: ", Amount);
    console.log("Your New Balance is: ", Balance);
  } else {
    console.log("Invalid amount");
  }
}

const func = async () => {
  while (true) {
    await Login();
    if (Username == "admin" && Password == "admin") {
      break;
    } else {
      console.log("Wrong UserName OR Password")
    }
  }
  console.log("WELCOME TO SHAYAN ATM")
  console.log("Enter admin as Username & Password")

  while (condition) {
    await Opt();

    switch (Options) {
      case "Withdraw":
        await takeAmount();
        Withdraw(Amount);
        break;

      case "Deposit":
        await takeAmount();
        Deposit(Amount);
        break;

      case "About":
        console.log("Your Name: ", Username)
        console.log("Your Account Balance: ", Balance)
        break;

      case "Exit":
        condition = false;
        break;

      default:
        break;
    }
  }
}

func();

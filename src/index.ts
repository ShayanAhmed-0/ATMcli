#!/usr/bin/env node
import inquirer from 'inquirer';

var Balance=Math.ceil(Math.random()*10000)
let Username:string;
let Password:string;
let Options:string;
let Ammount:number;
let condition:boolean=true;

const Login=async()=>{
    let LoginQuestions=await inquirer.prompt([
        {
            name:"Username",
            type:"string",
            message:"Enter User Name: ",
        },
        {
            name:"Password",
            type:"password",
            message:"Enter Password: ",
        },
    ]);
    Username=LoginQuestions.Username
    Password=LoginQuestions.Password
}

const Opt=async()=>{
    let Selection=await inquirer.prompt(
            {
                name:"Options",
                type:"list",
                message:"Select",
                choices:["Withdraw","Deposit","About","Exit"],
            }
    ) 
    Options=Selection.Options;       
}

const takeAmmount=async()=>{
    let givenAmmount=await inquirer.prompt({
    name:"enteredAmmount",
    type: "number",
    message: "Enter Ammount: "
})
    Ammount=givenAmmount.enteredAmmount;
}

const Withdraw=(Ammount:number):void=>{
    Balance  -=Ammount;
}


const Deposit=(Ammount:number):void=>{
    Balance +=Ammount;
}

const func=async()=>{
    while(true){
        await Login();
        if(Username=="admin" && Password=="admin"){
            break;
        }else{
            console.log("Wrong UserName OR Password")
        }
    }
    while (condition) { 
        
            await Opt();
    
        switch (Options) {
            case "Withdraw":
                await takeAmmount();
                Withdraw(Ammount)
                console.log("Ammount withdrawn: ",Ammount)
                console.log("Your New Balance is: ",Balance)
                break;
            
            case "Deposit":
                await takeAmmount();
                Deposit(Ammount)
                console.log("Ammount Deposited: ",Ammount)
                console.log("Your New Balance is: ",Balance)
                break;
            
            case "About":
                console.log("Your Name: ",Username)    
                console.log("Your Account Balance: ",Balance)    
                break;
            case "Exit":
                condition=false;
    
            default:
               break;
        }
    }
}

console.log("WELCOME TO SHAYAN ATM")
console.log("Enter admin as Username & Password")
func();



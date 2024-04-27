import './Credits.html';

import { sayHello } from "./greet";
//import { SillyMath } from 'typescriptlibrarytest/SillyMath';

function showHello(elementIDToFind: string, name: string) 
{
  const elt = document.getElementById(elementIDToFind);
  if (elt != null)
  {
    elt.innerText = sayHello(name);
  }
  
}
showHello("greetingID", "free form Typescript working in Shared Vite project!!!!!!!!!!!!!!!!");


//web pack did  not handle the custom code dependency from a github repo well, but Vite does
// const sm = new SillyMath();
// const product = sm.multiply(4, 5);
// console.log('4 x 5 = ' + product);

/*
function hello(compiler: string) {
    console.log(`Hello from ${compiler}`);
  }
  hello("TypeScript");
*/
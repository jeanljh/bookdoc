let varToString = varObj => Object.keys(varObj)[0];

let someVar = 100;
let displayName = varToString({someVar})
console.log('res = ' + displayName);
/*
Write a function called `stretch`. It should:

- return a promise
- print `"done stretching"`
- fulfill the promise after 1 second
*/

function stretch() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {console.log('done streaching'); resolve()}, 2000);
     })

}
//console.log(stretch());


/*
Write a function called `runOnTreadmill`. It should:

- return a promise
- print `"done running on treadmill"`
- fulfill the promise after 0.5 seconds
*/

function runOnTreadmill() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {console.log('done running on trademill'); resolve()}, 500);
    })

}
//console.log(runOnTreadmill());

/*
Write a function called `liftWeights`. It should:

- return a promise
- print `"done lifting weights"`
- fulfill the promise after 2 seconds
*/

function liftWeights() {
 return new Promise((resolve, reject) => {
     setTimeout(() => { console.log('done lifting weights'); resolve()}, 2000);
 })
}

//console.log(liftWeights());

/*
Write a function called `workout` that runs the above functions in a way
that ensures you begin running on the treadmill after you've finished
stretching. Begin lifting weights after running on the treadmill. Print
`"done working out"` after you've finished lifting weights.
*/

function workout() {
    stretch()
    .then(() => runOnTreadmill())
    .then(() => liftWeights())
    .then(() => console.log('done working out'));
}



/*
Test your code:

Run the file (`node part-1.js`) and check your output against the expected output.
*/


workout();
// done stretching
// done running on treadmill
// done lifting weights
// done working out
/*
  For this part, refactor your code from part-1.js in the practice for creating and handling promises.
  Use async & await to refactor the workout function. The function runs the given functions in a way that ensures you begin running on the treadmill after you're finished stretching, you begin lifting weights after you've finished running on the treadmill. Print "done working out" after you've finished lifting weights. 
*/

/*
Write a function called `stretch`. It should:

- return a promise
- print `"done stretching"`
- fulfill the promise after 1 second
*/

function stretch() {
      return new Promise((resolve, reject) => {
           setTimeout(() => resolve('done streaching'), 2000);
     })

}



/*
Write a function called `runOnTreadmill`. It should:

- return a promise
- print `"done running on treadmill"`
- fulfill the promise after 0.5 seconds
*/

function runOnTreadmill() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('done running on trademill'), 500);
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
     setTimeout(() => resolve('done lifting weights'), 2000);
 })
}

//console.log(liftWeights());

/*
Write a function called `workout` that runs the above functions in a way
that ensures you begin running on the treadmill after you've finished
stretching. Begin lifting weights after running on the treadmill. Print
`"done working out"` after you've finished lifting weights.
*/

async function workout() {
    const res1 = await stretch();
    console.log(res1);

    const res2 = await runOnTreadmill();
    console.log(res2);

    const res3 = await liftWeights();
    console.log(res3);
    console.log('done working out');
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
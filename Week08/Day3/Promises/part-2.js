function stretch(timeLeft) {
  return new Promise((resolve, reject) => {
      
      if (timeLeft >= 1000) {
           console.log('done streaching');
           timeLeft -= 1000;
           setTimeout(() => resolve(timeLeft), 1000);
      } else {
           reject('you dont have enough time to stretch');
      }
 
  })
}

function runOnTreadmill(timeLeft) {
    return new Promise((resolve, reject) => {

       if (timeLeft >= 500) {
            console.log('done running on trademill');
            timeLeft -= 500;
            setTimeout(() => resolve(timeLeft), 500);
       } else {
            reject('you dont have enough time to run OnTreadmill');
       }
    })

}

function liftWeights(timeLeft) {
    return new Promise ((reject, resolve) => {

        if (timeLeft >= 2000) {
            timeLeft -= 2000;
            setTimeout(() => resolve('done working out'), 2000);
            console.log('done lifting weights');
        } else {
            reject('you dont have enough time to liftWeights');
        }

    })

}

function workout(totalTime) {
	stretch(totalTime)
       .then((totalTime) => runOnTreadmill(totalTime))
       .then((totalTime) => liftWeights(totalTime))
       .then(msgSucces => console.log(msgSucces))
       .catch(msgError => console.log(msgError));
}

// TESTS

// comment in each invocation of your workout function below and run
// the file (node part-2.js) to see if you get the expected output

//workout(100);
//		done stretching
// 		Error:  you dont have enough time to run on treadmill

 //workout(3000);
// 		done stretching
// 		done running on treadmill
// 		Error:  you dont have enough time to lift weights

 workout(4000);
// 		done stretching
// 		done running on treadmill
// 		done lifting weights
// 		done workout out
function stretch(timeLeft) {
  return new Promise((resolve, reject) => {
      
      if (timeLeft >= 1000) {
          timeLeft -= 1000;
          setTimeout(() => {console.log('done streaching'); resolve(timeLeft)}, 1000);
      } else {
           reject('you dont have enough time to stretch');
      }
 
  })
}

function runOnTreadmill(timeLeft) {
    return new Promise((resolve, reject) => {

       if (timeLeft >= 500) {
            timeLeft -= 500;
            setTimeout(() => { console.log('done running on trademill'); resolve(timeLeft)}, 500);
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

async function workout(totalTime) {
    try {
	   const t1 = await stretch(totalTime);
       const t2 = await runOnTreadmill(t1);
       const msgSuccess = await liftWeights(t2);
       console.log(msgSuccess);
    } catch(errMessage) {
        console.log(errMessage);
    }   
}

// TESTS

// comment in each invocation of your workout function below and run
// the file (node part-2.js) to see if you get the expected output

//workout(1000);
//		done stretching
// 		Error:  you dont have enough time to run on treadmill

 //workout(3000);
// 		done stretching
// 		done running on treadmill
// 		Error:  you dont have enough time to lift weights

 //workout(4000);
// 		done stretching
// 		done running on treadmill
// 		done lifting weights
// 		done workout out
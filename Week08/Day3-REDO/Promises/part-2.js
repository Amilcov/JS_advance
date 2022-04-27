function stretch(timeLeft) {
  return new Promise ((resolve, reject) => {
      if (timeLeft >= 1000) {
            setTimeout(()=> {
                       console.log('done stretching');
                       resolve(timeLeft - 1000);
            }, 1000)
      } else {
          reject('stretch');
      }
  })
}

function runOnTreadmill(timeLeft) {
     return new Promise((resolve, reject) => {
            if (timeLeft >= 500) {
                  setTimeout(() => {
                            console.log('done runing on trademill');
                            resolve(timeLeft - 500);
                  }, 500);       
            } else {
                reject('runOnTrademill')
            }
     })
}

function liftWeights(timeLeft) {
     return new Promise((resolve, reject) => {
         if (timeLeft >= 2000) {
               setTimeout(() => {
                           console.log('done lifting weights');
                           resolve();
               }, 2000)   
         } else {
             reject('liftWeights');
         }
     })
}

function workout(totalTime) {
	stretch(totalTime)
     .then(value => runOnTreadmill(value))
     .then(value => liftWeights(value))
     .then(()=> console.log('done work out'))
     .catch(reason => console.log('You donn\'t have enought time to ', reason));
}

// TESTS

// comment in each invocation of your workout function below and run
// the file (node part-2.js) to see if you get the expected output

//workout(1000);
// 		done stretching
// 		Error:  you dont have enough time to run on treadmill

 //workout(2000);
// 		done stretching
// 		done running on treadmill
// 		Error:  you dont have enough time to lift weight
 workout(4000);
// 		done stretching
// 		done running on treadmill
// 		done lifting weights
// 		done workout out

//phase 1
function sayHiTo(name) {
   return 'Hello ' + name;
}

async function whatHourIs() {
    let date = new Date();
    return date.getHours();
}


console.log(sayHiTo('Phase I - Adriana'));
console.log(whatHourIs());

//phase 2
whatHourIs()
.then(value => console.log(value));


async function waiting() {
    const hourNow = await whatHourIs();
    console.log('Phase II - waiting fc: ', hourNow);
}
waiting();

//phase 3
async function promiseWithDelay() {
    const myPromise =  new Promise ((resolve, reject) => {
        setTimeout(() => {
               console.log('Hi i m promise returned by function');
               resolve('I\'m done');
        }, 2000);
    })
    const result = await myPromise;
    console.log('Phase III - Result of promise: ', result);
}


promiseWithDelay();

//phase 4


new Promise((resolve, reject) => {
    setTimeout(() => {
          console.log('i m delay inside a promise');
          resolve('Phase IV - promise done');
    }, 2000);

})
.then(result => console.log(result));


//phase 5

function waitForTimeout(ms) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
           console.log('I\'m from setTimeout fc');
           resolve('end timeout');
     }, ms))
}


async function run() {
    console.log('Phase V - start');
    await waitForTimeout(2000);
    console.log('Phase V - end');
}

run();



//phase 6

function doChors(number, step) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
              console.log(step, ':',number,' -Phase VI - start chors');
              if (number % 2 === 0) {
                console.log('Response resolve:');
                resolve('I do chors in even numbers');
              } else {
                console.log('-Response reject:');
                reject('I do not do chors in odd numbers');
              }
        }, 2000);
    })
}


 for (let i = 0; i < 5; i++) {
    let random = parseInt(Math.random() * 1000);
    console.log(i, ':', random);

    doChors(random, i)
     .then(val => console.log(val))
     .catch(err => console.log(err));
}


//Pase VII
async function phase8() {
 for (let i = 0; i < 5; i++) {
    let random = parseInt(Math.random() * 1000);
    console.log(i, ':', random);
   
    try{
        await doChors(random, i);
    } catch(err) {
       console.log(err => console.log(err));
    }
}

}
phase8();
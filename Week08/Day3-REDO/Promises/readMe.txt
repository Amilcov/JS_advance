
Atentie: 
1.  promises are a way of taking all the time neccessary to complete a task. when complete call resolve()
2.  promises sunt invers decat fc cu param:
                  fc cu param: 
                            - iau niste date din exterior(param) 
                            - exec ceva 
                            - intorc orice
                  
                  promies:
                            - prin parametrii intorc ceva in exerior
                            - executa ceva + INTORC MEREU 1 DIN 2 RASPUNSURI: resolve() || reject() [ca si parametru];
                            - odata cu call resolve()/ reject() == "I'm done"
                            - promise.then(). se va apela dupa ce promisiunea a trimis resolve sau reject

function step1() {
 return new Promise(resolve => setIimeout({
                                            console.log('1.Eu sunt pasulI si stau 2 secunde sa-l execut');
                                            resolve();
                                         }, 2000))
}

function step2() {
 return new Promise(resolve => setIimeout({
                                            console.log('2.Eu sunt pasulII si stau 1 secunda sa-l execut');
                                            resolve();
                                         }, 2000))
}

function step3() {
 return new Promise(resolve => setIimeout({
                                            console.log('3.Eu sunt pasulIII si stau 0.5 secunda sa-l execut');
                                            resolve();
                                         }, 2000))
}

step1()
.then(step2)
.then(step3)
.catch(reson => console.log('Error is: ', reason))

   // output
       1.Eu sunt pasulI si stau 2 secunde sa-l execut.     00:00:020
       2.Eu sunt pasulII si stau 1 secunda sa-l execut.    00:00:030 
       3.Eu sunt pasulIII si stau 0.5 secunda sa-l execut. 00:00:035 
       
       
       Nota: 
           then - primeste ca param handel -ul unei fc
           step1() e o fc (care intoarece o promisiune )si de accea trebuie invocata

let count = document.querySelector(".count span");
let bullets = document.querySelector(".bullets .spans");
let ques = document.querySelector(".quiz-area")
let answer = document.querySelector(".answers-area")
let sub = document.querySelector(".submit-button")

let current = 0
let trues = 0
let duration = 100
function getQuest() {
    let x = new XMLHttpRequest();

    x.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let data = JSON.parse(this.responseText)
            dataCount = data.length
            createBullets(dataCount)
            addQuestionData(data[current],dataCount);

            let time= document.querySelector(".countdown")
            let timeS = document.createElement("span")   
            timeS.innerHTML = `0:0${duration}`
            time.appendChild(timeS)

            let interval;
            function startTimer() {
            clearInterval(interval);
            duration = 100;

            let timeS = document.querySelector(".countdown span");
            timeS.innerHTML = `0:0${duration}`;

            interval = setInterval(() => {
                duration--;
                timeS.innerHTML = `0:0${duration}`;

                if (duration === 0) {
                clearInterval(interval); 
                sub.click();
                }
            }, 1000);
            }


            window.onload = function(){  
                startTimer()             
            }


            sub.addEventListener("click",()=>{
                startTimer()
                // console.log(document.querySelector("input[name='choose']:checked"))
                if(document.querySelector("input[name='choose']:checked")){

                    let chek = document.querySelector("input[name='choose']:checked")
                    if(data[current].answer === chek.value){
                        console.log("true")
                        trues++
                    }else{
                        console.log("false")
                    }
                    if(current !== dataCount-1){

                    current++
                    addQuestionData(data[current],dataCount);

                    let active = document.querySelector(".on");
                    (active.parentElement.children[current]).classList.add("on")
                    }else{
                        document.querySelector(".bullets").remove()
                        document.querySelector(".submit-button").remove()
                        document.querySelector(".answers-area").remove()
                        document.querySelector(".quiz-area").remove()
                        
                        
                        let result = document.querySelector(".results")
                        let resultS = document.createElement("span")
                        console.log(trues)
                        console.log(dataCount)
                        if(trues === dataCount){
                            resultS.innerHTML = `perfect ${trues}/${dataCount}`
                            resultS.classList.add("perfect")
                        }else if(trues > dataCount-trues){
                            resultS.innerHTML = `good ${trues}/${dataCount}`
                            resultS.classList.add("good")
                        }else{
                            resultS.innerHTML = `bad ${trues}/${dataCount}`
                            resultS.classList.add("bad")
                        }
                        result.appendChild(resultS)
                    }

                }else{

                    if(current !== dataCount-1){

                    current++
                    addQuestionData(data[current],dataCount);

                    let active = document.querySelector(".on");
                    (active.parentElement.children[current]).classList.add("on")
                    }else{
                        document.querySelector(".bullets").remove()
                        document.querySelector(".submit-button").remove()
                        document.querySelector(".answers-area").remove()
                        document.querySelector(".quiz-area").remove()

                        
                        let result = document.querySelector(".results")
                        let resultS = document.createElement("span")
                        if(trues > dataCount-trues){
                            resultS.innerHTML = `good ${trues}/${dataCount}`
                            resultS.classList.add("good")
                        }else if(trues == dataCount){
                            resultS.innerHTML = `perfect ${trues}/${dataCount}`
                            resultS.classList.add("perfect")
                        }else{
                            resultS.innerHTML = `bad ${trues}/${dataCount}`
                            resultS.classList.add("bad")
                        }
                        result.appendChild(resultS)
                    }  
                    console.log("finish")
                    
                }
                

            })


        }
    }

    x.open("GET","main.json",true);
    x.send() 
}
getQuest()

function createBullets(num){
    count.innerHTML = num;

    // create bullets

    for(let i=0; i<num; i++){
        let bullet = document.createElement("span")

        if(i === 0){
            bullet.className = "on" 
        }

        bullets.appendChild(bullet)       
    }
    
}
function addQuestionData(question, qCount) {
    answer.innerHTML = ""
    ques.innerHTML = ""
    let q = document.createElement("h2");
    q.innerHTML = question.title
    ques.appendChild(q)

    for (let i = 1; i <= 4; i++) {
        let mainDiv = document.createElement("div");

        // Add Class To Main Div
        mainDiv.className = "answer";
        let inp = document.createElement("input");
        inp.type = "radio";
        inp.name = "choose";
        inp.id = `choices-${i}`;
        inp.value = question[`choices-${i}`]; // ✅ عشان تاخد النص بعدين

        let lab = document.createElement("label");
        lab.textContent = question[`choices-${i}`];
        lab.htmlFor = `choices-${i}`;

        mainDiv.appendChild(inp);
        mainDiv.appendChild(lab);
        answer.appendChild(mainDiv);
    }
    let a = document.querySelectorAll(".answer");
    // a.forEach((s)=>{
    //     s.addEventListener("click",()=>{
    //         a.forEach((i)=>{
    //             i.classList.remove("ans")
    //         })
    //         s.classList.add("ans")
    //     })
    // })
}

// function myanser(e){
//     console.log(e)
// }
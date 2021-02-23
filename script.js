let workClicks=25;
let breakClicks=5;
let workDisplay=document.getElementById("work-display");
let breakDisplay=document.getElementById("break-display");;
let count=0;
let workSession;
let breakSession;


const increaseWork=document.getElementById("addWorkButton");
increaseWork.addEventListener("click",()=>{
    workClicks+=1;
    workDisplay.innerHTML=workClicks;
})

const decreaseWork=document.getElementById("minusWorkButton");
decreaseWork.addEventListener("click",()=>{
    workClicks-=1;
    workDisplay.innerHTML=workClicks;
    if(workClicks<1){
        workClicks=1;
        workDisplay.innerHTML=workClicks;
    }
})

const increaseBreak=document.getElementById("addBreakButton");
increaseBreak.addEventListener("click",()=>{
    breakClicks+=1;
    breakDisplay.innerHTML=breakClicks
},false)

const decreaseBreak=document.getElementById("minusBreakButton");
decreaseBreak.addEventListener("click",()=>{
    breakClicks-=1;
    breakDisplay.innerHTML=breakClicks;
    if(breakClicks<1){
        breakClicks=1;
        breakDisplay.innerHTML=breakClicks;
    }
},false)

const start =()=>{
    count=workClicks*60;
    workSession=setInterval(workCountDown,1000);
}

const workCountDown =()=>{
    let seconds=count;
    let hours=Math.floor(seconds/3600);
    seconds-=hours*3600;
    let minutes=Math.floor(seconds/60);seconds-=minutes*60;
    document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) +":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
    count--;
    if(count<0){
        clearInterval(workSession);
        workSession = null;
        document.getElementById("showtime").innerHTML ="Starting Break";
        let breakDelay=setTimeout(()=>{
            startBreak();
        },3000)
    }
}

const pause=()=>{
    clearInterval(workSession);
    clearInterval(breakSession);
	workSession = null;
	breakSession = null;
};

const resume=()=>{
    workSession=setInterval(workCountDown,1000);
}

const reset =()=>{
    if(workSession){
        clearInterval(workSession);
        workSession = null;
    }else{
        clearInterval(breakSession);
        breakSession = null;
    }

    document.getElementById("showtime").innerHTML ="";
    document.getElementById("timer-panel").style.backgroundColor="#FC5D66";
    document.getElementById("pause").disabled =false;
    document.getElementById("resume").disabled=false;
}

const startBreak =()=>{
    count=breakClicks*60;
    breakSession=setInterval(breakCountDown,1000);
    document.getElementById("pause").disabled=false;
    document.getElementById("resume").disabled=false;
};

const breakCountDown=()=>{
    document.getElementById("timer-panel").style.backgroundColor="lightblue";
    let seconds = count;
	let hours = Math.floor(seconds/3600);
	seconds-= hours*3600;
	var minutes = Math.floor(seconds/60);
	seconds-= minutes*60;
	document.getElementById("showtime").innerHTML = ('00' + hours).slice(-2) +":" + ('00' + minutes).slice(-2) + ":" + ('00' + seconds).slice(-2);
	count--;
    if(count<0){
        clearInterval(breakSession);
        breakSession = null;
        let message =setTimeout(()=>{
            document.getElementById("showtime").innerHTML = "Congratulations pomodoro completed!";
        },3000)
    }
}

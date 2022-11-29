let n = document.querySelector('.name span');
let deb = document.getElementById('debut');
let ln = localStorage.getItem("name");
let lt = localStorage.getItem("tries")
if (ln !== null && lt !== null) {
    document.querySelector(".player .name").innerHTML = 'Last player: ' +ln;
    document.querySelector(".player .tries").textContent = lt;
}
deb.onclick = function (){
    let name = prompt("Whats your name?");
    if (name == null || name == ""){
        n.textContent = "Anonym ";
    }else {
        n.textContent = name;
    }
    deb.remove();
    // deb.style.display = "none";
}
let dur = 2000;
let game = document.querySelector(".game-container");
let blocks = Array.from(game.children);
let orderRange = [...Array(blocks.length).keys()];
// let orderRange = Array.from(blocks.length).keys();
const arr = [];
Random();
blocks.forEach ((el,i) => {
    el.style.order = arr[i];
    el.addEventListener ("click",function(){
        // flipBlock(el);
        el.classList.add("is-flipped");
        let flipped = blocks.filter(blc => blc.classList.contains('is-flipped'));
        if (flipped.length === 2){
            // Stopclick ();
            // CheckMatched(flipped[0],flipped[1]);
            game.classList.add("no-clicking");
            setTimeout(() => {
                game.classList.remove("no-clicking");
            }, dur);
            let tries = document.querySelector(".tries span");
            if (flipped[0].dataset.technology === flipped[1].dataset.technology){
                document.getElementById("success").play();
                flipped[0].classList.remove("is-flipped");
                flipped[1].classList.remove("is-flipped");
                flipped[0].classList.add("matched");
                flipped[1].classList.add("matched");
            }else {
                tries.innerHTML = parseInt(tries.innerHTML)+1;
                setTimeout(() => {
                    flipped[0].classList.remove("is-flipped");
                    flipped[1].classList.remove("is-flipped");
                }, dur);
                document.getElementById("fail").play();
            }
        }
        let end = blocks.filter(b => b.classList.contains("matched"));
        if (end.length === 20){
                localStorage.setItem("name",document.querySelector(".name span").innerHTML);
                localStorage.setItem("tries" , document.querySelector(".tries span").innerHTML);
                document.getElementById("end").play();
                setTimeout(() => {
                    window.location.reload();
                }, dur * 3);
        }
    });
});

// function flipBlock (block) {
   
// }
// function Stopclick (){
    
//  }
// function CheckMatched (f1,f2){
   
// }
function Random(){
    while(arr.length < blocks.length){
        let r = Math.floor(Math.random() * blocks.length);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}
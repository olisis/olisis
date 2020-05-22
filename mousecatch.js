allowDrop = function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

drop = function drop(ev) {
var data = ev.dataTransfer.getData("text");
console.log(data, data.startsWith('hareDrag'));

     if (data.startsWith('mouseDrag')) {
     var rodentToDrop = new rodent(
                  "Mouse"+i,
                  1,
                  '<img  id = "mouseDrag" draggable="true" ondragstart="drag(event)" src="mouse-transparent.png" height="35" width="60" style="background-color:transparent;  padding:0px;">',
                  'mouse_sound',
                  '<img  src="mouse-transparent.png" height="20" width="20" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
                  );

     };
 if (data.startsWith('hamsterDrag')) {
     var rodentToDrop = new rodent(
                  "Mouse"+i,
                  1,
                  '<img  id = "hamsterDrag" draggable="true" ondragstart="drag(event)" src="dwarf-hamster-png.png" height="35" width="60" style="background-color:transparent;  padding:0px;">',
                  'mouse_sound',
                  '<img  src="dwarf-hamster-png.png" height="20" width="20" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
                  );

     };

     if (data.startsWith('ratDrag')) {
           var  rodentToDrop = new rodent(
                 "Rat"+i,
                  2,
                  '<img id = "ratDrag" draggable="true" ondragstart="drag(event)" src="rat-transparent.png" height="55" width="115" style="background-color:transparent;  padding:0px;">',
                   'rat_sound',
                   '<img src="rat-transparent.png" height="20" width="45" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
                   );

     };

     if (data.startsWith('rabbitDrag')) {
       var rodentToDrop = new rodent(
                 "Rabbit"+i,
                  3,
                   '<img id = "rabbitDrag" draggable="true" ondragstart="drag(event)"  src="2rabbits-transparent.png" height="60" width="130" style="background-color:transparent;  padding:0px;">',
                    'rabbit_sound',
                    '<img src="2rabbits-transparent.png" height="20" width="45" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
                    );

     };

     if (data.startsWith('hareDrag')) {
            var rodentToDrop = new rodent(
          "Hare"+i,
           4,
            `<img id = ${"hareDrag"+Math.floor(Math.random()*1000)} draggable="true" ondragstart="drag(event)" src="hare-transparent.png" height="60" width="135" style="background-color:transparent;  align:center;">`,
             'hare_sound',
             '<img src="hare-transparent.png" height="20" width="50" style="background-color:rgba(0,0,0, .4);  padding-left:15px;">'
             );
     } else {console.log("else", data, data.startsWith('hareDrag'));};

      console.log(ev.target.id);
      rodentToDrop.pos = Number(ev.target.id);
      console.log(rodentToDrop, rodentToDrop.pos);
      rodentToDrop.draw();
}


var nClicks = 0;
var nRdts = 0;

var winH = this.innerHeight-85;
var mouse_video = document.getElementById("mouse_video");


var element = document.getElementById("holes");
//brd.appendChild(mouse_video);
//mouse_video.play();
var tbody1 = document.getElementById("tbody1");
tbody1.setAttribute("style", `height: ${winH}px;`);
//tbody1.setAttribute("style", `height: 300px;`);

for (var i=0; i < 20; i++) {

  row = document.createElement('tr');
  rowN = document.createElement('td');
  /*colN = document.createElement('th');*/
  tbody1.appendChild(row);
  rowName = row.appendChild(rowN);
  rowName.innerHTML = i;
  rowName.classList.add('rowNames');

  for (var j=0; j < 10; j++) {
      dat = document.createElement('td');
      c = row.appendChild(dat);
      c.setAttribute("id", i*10+j);
      c.setAttribute("ondrop", "drop(event)");
      c.setAttribute("ondragover", "allowDrop(event)");


      //ondrop="drop(event)" ondragover="allowDrop(event)"
      }
}
function randomPos(rodent) {
dec = Math.floor(Math.random()*10)*10;
    single = Math.floor(Math.random()*(10-rodent.len+1));
    return (dec+single);
}

function rodent(name, len, pic, snd, sidepic)  {
    this.name = name;
    this.len = len;
    this.pic = pic;
    this.snd = snd;
    this.sidepic = sidepic;
    this.pos = randomPos(this);

    console.log("rodent at:", this.pos);

     this.draw = () => {
        // Add rodent image to sidebar
         found = document.getElementById("found");
         foundImg = document.createElement('div');
         foundBr = document.createElement('br');
         //this.pic.style.height = "10px";
        // rPic = this.pic;
         //rPic.setAttribute("style", "height: 10px;");
         foundImg.innerHTML = this.sidepic ;
         console.log(foundImg);
       /*  mPic = document.getElementById("mouseside");*/
       /*  console.log(mPic);*/
         /*mPic.setAttribute("style", "height: 35px;");
*/
         console.log(this.pic);
         found.appendChild(foundImg);
         found.appendChild(foundBr);
         // Draw rodent in field
        dom = document.getElementById(this.pos);
        dom.setAttribute("colspan", this.len);
        dom.setAttribute("align", "center");
        dom.innerHTML = this.pic;

        for (let i=this.pos+1; i < this.pos+this.len; i++) {
        console.log("to remove ", this.pos);
             e = document.getElementById(i);
             console.log(e);
             e.remove();
        }
        n = document.getElementById("numRdts");
                nRdts++;
                if (nRdts >= rodents.length) {

                setTimeout(function() {

                    var winSound = document.getElementById("win_sound");
                    winSound.play();
                    n.innerHTML = `You won!!!`;
                }, 2000);

                }
                else {
                n.innerHTML = `${rodents.length - nRdts} rodents left to find!`;
                }
        }

        this.make_sound = function() {
        rodent_sound = document.getElementById(this.snd);
        rodent_sound.play();
        }
}

function Shit(name, pos, len, pic, snd)  {
   this.name = name;
    this.pos = pos;
    this.len = len;
    this.pic = pic;
    this.snd = snd;

     this.draw = function() {
        dom = document.getElementById(this.pos);
        dom.innerHTML = this.pic;
        n = document.getElementById("numClicks");
        nClicks++;
        n.innerHTML = `${nClicks} shit!!!`
        }

      this.make_sound = function() {
              shit_sound = document.getElementById(this.snd);
              shit_sound.play();
      }

}

function add_lsnr(r) {
        for (var i=r.pos; i < (r.pos+r.len); i++) {
        //console.log("adding listener for: ", r.name, " to ", r.pos)
                     e = document.getElementById(i);
                     e.addEventListener('click', function() {
                        r.draw();
                        r.make_sound();
                     })
         }
      }

var rodents = [];


//this function get a position on board and check for collision with any rodents in the array
function collision(j) {
    return (
    rodents.some(function(r) {
    //console.log("checking for collision of ", j, " with interval ", r.pos, " and ", (r.pos +r.len - 1));
        return ((j >= r.pos) && (j <= (r.pos +r.len - 1)));
    })
    );
}
//this apply get as a parameter a pos of rodent and check all locations of rodent for a possible collisions
function isRodent(pos, offset) {
    var foundCollision = false;

    /*for (i1=pos-1; i1<(pos+offset+1);i1++) {*/
    //console.log("if any collision at ", i);

    free = []
    x = pos%10;
    y = (pos-x);

    for (var y1=(y-10); y1 <= (y+10); y1=y1+10) {
        for (var x1=(x-1); x1 < (x+offset+1); x1++) {
                free.push(x1+y1)
                //console.log("add: ", x1+y1);
            }
    }

    foundCollision = free.some( f => collision(f));

    /*(y-1)+x-1, (y-1)+x....(y-1)+x+offset,x+(y-1)+offset+1
    y+x-1, y+x....y+x+offset,x+y+offset+1
    (y+1)+x-1, (y+1)+x....(y+1)+x+offset,x+(y+1)+offset+1*/

    /*for (var i1=pos; i1<(pos+offset); i1++) {
    if (collision(i1)) {
    foundCollision = true;
    break;
    }
    else  {

    foundCollision = false;
    //console.log("no collision found at ", i, " ", foundCollision);
    }
    }*/
    //console.log("returning ", i, " ", foundCollision);

    return(foundCollision);
}

function checkInput(inp, dflt) {
inp = Number(inp);
if (typeof(inp) === 'number')  {
        return(inp);
        }
        else {
        return(dflt);
        }
}

function handleRodentsButton() {



document.getElementById("mouse_video").remove();
//var inputform = document.getElementById("inputform");
//inputform.setAttribute("style", "display: none;");

var miceInput = document.getElementById("miceInput");
var numberOfMice = checkInput(miceInput.value, 4);
miceInput.value = numberOfMice;

var ratsInput = document.getElementById("ratsInput");
var numberOfRats = checkInput(ratsInput.value, 3);
ratsInput.value = numberOfRats;

var rabbitsInput = document.getElementById("rabbitsInput");
var numberOfRabbits = checkInput(rabbitsInput.value , 2);
rabbitsInput.value = numberOfRabbits;

var haresInput = document.getElementById("haresInput");
var numberOfHares =  checkInput(haresInput.value , 1);
haresInput.value = numberOfHares;

      for (i = 0; i < numberOfHares; i++ ) {
          do {
          var hare = new rodent(
          "Hare"+i,
           4,
            `<img id = ${"hareDrag"+Math.floor(Math.random()*1000)} draggable="true" ondragstart="drag(event)" src="hare-transparent.png" height="60" width="135" style="background-color:transparent;  align:center;">`,
             'hare_sound',
             '<img src="hare-transparent.png" height="20" width="50" style="background-color:rgba(0,0,0, .4);  padding-left:15px;">'
             );
          }
               while(isRodent(hare.pos, 4))
          add_lsnr(hare);
          rodents.push(hare);
          }

      for (i = 0; i < numberOfRabbits; i++ ) {
            do {
            var rabbit = new rodent(
            "Rabbit"+i,
             3,
              '<img id = "rabbitDrag" draggable="true" ondragstart="drag(event)"  src="2rabbits-transparent.png" height="60" width="130" style="background-color:transparent;  padding:0px;">',
               'rabbit_sound',
               '<img src="2rabbits-transparent.png" height="20" width="45" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
               );
            }
            while(isRodent(rabbit.pos,3))
            add_lsnr(rabbit);
            rodents.push(rabbit);
            }

      for (i = 0; i < numberOfRats; i++ ) {
            do {
            var rat = new rodent(
            "Rat"+i,
             2,
             '<img id = "ratDrag" draggable="true" ondragstart="drag(event)" src="rat-transparent.png" height="55" width="115" style="background-color:transparent;  padding:0px;">',
              'rat_sound',
              '<img src="rat-transparent.png" height="20" width="45" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
              );
            }
            while(isRodent(rat.pos,2))
            add_lsnr(rat);
            rodents.push(rat);
            }

	 for (i = 0; i < numberOfMice; i++ ) {
         do {
         var mouse = new rodent(
         "Mouse"+i,
         1,
         '<img  id = "mouseDrag" draggable="true" ondragstart="drag(event)" src="mouse-transparent.png" height="35" width="60" style="background-color:transparent;  padding:0px;">',
         'mouse_sound',
         '<img  src="mouse-transparent.png" height="20" width="20" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
         );
         }
         while(isRodent(mouse.pos,1))
         add_lsnr(mouse);
         rodents.push(mouse);
         }

          for (i = 0; i < numberOfMice; i++ ) {
                  do {
                  var hamster = new rodent(
                  "Mouse"+i,
                  1,
                  '<img  id = "hamsterDrag" draggable="true" ondragstart="drag(event)" src="dwarf-hamster-png.png" height="35" width="55" style="background-color:transparent;  padding:0px;">',
                  'hamster_sound',
                  '<img  src="dwarf-hamster-png.png" height="20" width="20" style="background-color:rgba(0,0,0 ,.4);  padding-left:15px;">'
                  );
                  }
                  while(isRodent(hamster.pos,1))
                  add_lsnr(hamster);
                  rodents.push(hamster);
                  }

      for (n = 0; n < 200; n++ ) {
         if (!isRodent(n, 1)) {

         var shit = new Shit("mouse_poop", n, 1, '<img src="Mouse_Poop.png" height="60" width="60" style="background-color:transparent;  padding:0px;">', 'poop_sound');
         add_lsnr(shit);
         }
         }

}

window.onload = init;

function init() {
    var board = document.getElementById("board");
    var randomBackground = "rod"+Math.floor(Math.random()*1);

    board.classList.add(randomBackground);
	var rodentsButton = document.getElementById("rodentsButton");
	rodentsButton.onclick = handleRodentsButton;
}

const holes = document.querySelectorAll('td');
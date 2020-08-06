// Make connection
var socket = io.connect('https://findrodents.herokuapp.com/');

// Query DOM
var message = document.getElementById('move'),
   /* handle = document.getElementById('handle'),*/
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// Choose player

// Emit events
btn.addEventListener('click', function(){
    socket.emit('move', {
        message: message.value
       /* ,handle: handle.value*/
    });
    //message.value = "";
});

socket.on('move', function(data){
// Try to find rodent

            rdn = rodents.find(function(rodent){
                if (data.message >= rodent.pos && data.message < (rodent.pos+rodent.len) ) {
                return rodent;
                }
            });

            // If found,  mark grey
            if ( rdn ) {
                           document.getElementById(rdn.pos).style.backgroundColor = "red";
                           rdn.make_sound();
                           socket.emit('chat', {
                                                   message: rdn.name,
                                                   position: rdn.pos
                                               });
                       }
                       // if not found,  mark red
                       else {
                            document.getElementById(data.message).style.backgroundColor = "red";
                            document.getElementById(data.message).innerHTML = '<img src="Mouse_Poop.png" height="35" width="60" style="background-color:transparent;  padding:0px;">'
                            socket.emit('chat', {
                                                  message: 'Missed',
                                                  position: data.message
                                              });

                        }


});

socket.on('chat', function(data){

        output.innerHTML = '<p>'+data.message+'</p>';

        if (data.message === "Mouse") {
            var rodentFound = new rodent(
                              "Mouse",
                              1,
                              '<img src="mouse-transparent.png" height="35" width="60" style="background-color:transparent;  padding:0px;">',
                              'mouse_sound'
                          );

         };

         if (data.message === "Rat") {
            var rodentFound = new rodent(
                                      "Rat",
                                       2,
                                       '<img id = "ratDrag" draggable="true" ondragstart="drag(event)" src="rat-transparent.png" height="55" width="115" style="background-color:transparent;  padding:0px;">',
                                       'rat_sound'
                                   );
         };
        if (data.message === "Rabbit") {
            var rodentFound = new rodent(
                             "Rabbit",
                              3,
                               '<img id = "rabbitDrag" draggable="true" ondragstart="drag(event)"  src="2rabbits-transparent.png" height="60" width="130" style="background-color:transparent;  padding:0px;">',
                                'rabbit_sound'
                                );
         };

         if (data.message === "Hare") {
            var rodentFound = new rodent(
                                    "Hare",
                                      4,
                                       `<img id = ${"hareDrag"+Math.floor(Math.random()*1000)} draggable="true" ondragstart="drag(event)" src="hare-transparent.png" height="60" width="135" style="background-color:transparent;  align:center;">`,
                                        'hare_sound'
                                   );
                  };

         if (data.message === "Missed") {
                     var rodentFound = new rodent(
                                       "Poop",
                                       1,
                                       '<img src="Mouse_Poop.png" height="35" width="60" style="background-color:transparent;  padding:0px;">',
                                       'poop_sound'
                                   );

                  };

        document.getElementById(data.position).style.backgroundColor = "red";
        console.log(data.position);
        rodentFound.pos = Number(data.position);
        console.log(rodentFound);
        rodentFound.draw();
        //document.getElementById(message.value).style.backgroundColor = "grey";
        rodentFound.make_sound();

        /*console.log(ev.target.id);
              rodentToDrop.pos = Number(ev.target.id);
              console.log(rodentToDrop, rodentToDrop.pos);
              rodentToDrop.draw();
              rodents.push(rodentToDrop);*/
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
allowDrop = function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

drop = function drop(ev) {
     var data = ev.dataTransfer.getData("text");
     if (data.startsWith('mouseDrag')) {
     var rodentToDrop = new rodent(
                  "Mouse",
                  1,
                  '<img  id = "mouseDrag" draggable="true" ondragstart="drag(event)" src="mouse-transparent.png" height="35" width="60" style="background-color:transparent;  padding:0px;">',
                  'mouse_sound'
                  );
                  console.log(rodentToDrop);


     };

     if (data.startsWith('ratDrag')) {
           var  rodentToDrop = new rodent(
                 "Rat",
                  2,
                  '<img id = "ratDrag" draggable="true" ondragstart="drag(event)" src="rat-transparent.png" height="55" width="115" style="background-color:transparent;  padding:0px;">',
                   'rat_sound'
                   );

     };

     if (data.startsWith('rabbitDrag')) {
       var rodentToDrop = new rodent(
                 "Rabbit",
                  3,
                   '<img id = "rabbitDrag" draggable="true" ondragstart="drag(event)"  src="2rabbits-transparent.png" height="60" width="130" style="background-color:transparent;  padding:0px;">',
                    'rabbit_sound'
                    );

     };

     if (data.startsWith('hareDrag')) {
            var rodentToDrop = new rodent(
          "Hare",
           4,
            `<img id = ${"hareDrag"+Math.floor(Math.random()*1000)} draggable="true" ondragstart="drag(event)" src="hare-transparent.png" height="60" width="135" style="background-color:transparent;  align:center;">`,
             'hare_sound'
             );
     };

      console.log(ev.target.id);
      rodentToDrop.pos = Number(ev.target.id);
      console.log(rodentToDrop, rodentToDrop.pos);
      rodentToDrop.draw();
      rodents.push(rodentToDrop);
}

var nClicks = 0;
var nRdts = 0;

var winH = this.innerHeight-85;
var mouse_video = document.getElementById("mouse_video");

var element = document.getElementById("holes");
var tbody1 = document.getElementById("tbody1");
tbody1.setAttribute("style", `height: ${winH}px;`);

for (var i=0; i < 10; i++) {
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
      }
}


function rodent(name, len, pic, snd, sidepic)  {
    this.name = name;
    this.len = len;
    this.pic = pic;
    this.snd = snd;

     this.draw = () => {
         // Draw rodent in field
        dom = document.getElementById(this.pos);
        dom.setAttribute("colspan", this.len);
        dom.setAttribute("align", "center");
        dom.innerHTML = this.pic;
        //remove td elements to make space for the image
        for (let i=this.pos+1; i < this.pos+this.len; i++) {
            console.log("Removed ", i);
             e = document.getElementById(i);
             e.remove();
        }

        /*n = document.getElementById("numRdts");
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
                }*/

        }

        this.make_sound = function() {
        rodent_sound = document.getElementById(this.snd);
        rodent_sound.play();
        }
}

var rodents = [];

window.onload = init;

function init() {
    var board = document.getElementById("board");
    var randomBackground = "rod"+Math.floor(Math.random()*1);
    board.classList.add(randomBackground);
}


//images

//bodies
//form the basis of a new monster
//their attachments define the location and orientation of appendages that can be added (x,y,anglemin,anglemax)
var kitty = new Image()
kitty.type = "body";
kitty.src = "Images/bodies/kitty.png"
kitty.offsetX = 50
kitty.width = 300
kitty.height=300
kitty.hasAttachments = true
kitty.attachments = [
    [108,270,45,135],//tail
    [270,200,350,360],//right leg
    [230,200,0,10],//left leg
    [250,95,240,300]//head
]

var armadillo = new Image()
armadillo.type = "body"
armadillo.src="Images/bodies/armadillo.png"
armadillo.width = 500
armadillo.height = 275
armadillo.hasAttachments = true
armadillo.attachments = [
    [60,210,50,70], //front leg
    [420,230,-60,60], //back leg
    [35,120,75,130]] //head

var giraffe = new Image()
giraffe.type="body"
giraffe.src = "Images/bodies/giraffe.png"
giraffe.width=309
giraffe.height=376
giraffe.hasAttachments=true
giraffe.attachments = [
    [19,25,180,240],//head
    [230,295,10,10],//other back leg
    [200,295,10,30],//back leg
    [84,295,10,10]//front leg
]

//features
//attached within the body of the monster
var eye1 = new Image()
eye1.type = "feature"
eye1.src = "Images/features/eye1.png"

var mouth = new Image()
mouth.type = "feature"
mouth.src="Images/features/mouth1.png"

var valves = new Image()
valves.type = "feature"
valves.src="Images/features/valves.png"

var suriname = new Image()
suriname.type="feature"
suriname.src="Images/features/suriname.png"

//appendages
//attached along the boundary of the monster
var anemone = new Image()
anemone.type = "appendage"
anemone.src="Images/appendages/anemone.png"
anemone.attachAt = [144,4]

var anemone2 = new Image()
anemone2.type = "appendage"
anemone2.src="Images/appendages/anemone2.png"
anemone2.attachAt = [55,10]

var anemone3 = new Image()
anemone3.type = "appendage"
anemone3.src="Images/appendages/anemone3.png"
anemone3.width=300
anemone3.attachAt = [40,54]

var coral1 = new Image()    //omit; this one doesn't look good
coral1.type = "appendage"
coral1.src="Images/appendages/coral1.png"
coral1.width = 150
coral1.height=150
coral1.attachAt = [15,65]

var hand1 = new Image()
hand1.type="appendage"
hand1.src="Images/appendages/hand1.png"
hand1.attachAt=[14,11]

var hand2 = new Image()
hand2.type="appendage"
hand2.src="Images/appendages/hand2.png"
hand2.attachAt=[15,25]

var hand3 = new Image()
hand3.type="appendage"
hand3.src="Images/appendages/hand3.png"
hand3.attachAt=[61,11]

var frogleg = new Image()
frogleg.type="appendage"
frogleg.src="Images/appendages/frogleg.png"
frogleg.width = frogleg.width*.75
frogleg.height = frogleg.height*.75
frogleg.attachAt=[189*.75,61*.75]

var rocksucker = new Image() // work on this one
rocksucker.type="appendage"
rocksucker.src="Images/appendages/rocksucker.png"
rocksucker.width = rocksucker.width*.5
rocksucker.height = rocksucker.height*.5
rocksucker.attachAt=[74*.5,160*.5]

var fishtail = new Image()
fishtail.type="appendage"
fishtail.src="Images/appendages/fishtail.png"
fishtail.width = fishtail.width*.8
fishtail.height = fishtail.height*.8
fishtail.attachAt=[63*.8,24*.8]

//textures (backgrounds, perhaps skins)
var decopaper1 = new Image()
decopaper1.src="Images/textures/decopaper1.jpg"

var decopaper2 = new Image()
decopaper2.src="Images/textures/decopaper2.jpg"

var decopaper3 = new Image()
decopaper3.src="Images/textures/decopaper3.jpg"

var decopaper4 = new Image()
decopaper4.src="Images/textures/decopaper4.jpg"

var decopaper5 = new Image()
decopaper5.src="Images/textures/decopaper5.jpg"

var decopaper6 = new Image()
decopaper6.src="Images/textures/decopaper6.jpg"

var decopaper7 = new Image()
decopaper7.src="Images/textures/decopaper7.jpg"

var decopaper8 = new Image()
decopaper8.src="Images/textures/decopaper8.jpg"

var decopaper9 = new Image()
decopaper9.src="Images/textures/decopaper9.jpg"

var decopaper10 = new Image()
decopaper10.src="Images/textures/decopaper10.jpg"

var decopaper11 = new Image()
decopaper11.src="Images/textures/decopaper11.jpg"

var decopaper12 = new Image()
decopaper12.src="Images/textures/decopaper12.jpg"

var decopaper13 = new Image()
decopaper13.src="Images/textures/decopaper13.jpg"

var decopaper14 = new Image()
decopaper14.src="Images/textures/decopaper14.png"

//data structures
var bodies = [kitty, armadillo, giraffe]
var features = [eye1, mouth,valves,suriname]
var appendages = [anemone, anemone2, anemone3,hand1,hand2,hand3,frogleg,fishtail]
var textures = [decopaper1,decopaper2,decopaper3,decopaper4,decopaper5,decopaper6,decopaper7,decopaper8,decopaper9,decopaper10,decopaper11,decopaper12,decopaper13,decopaper14]

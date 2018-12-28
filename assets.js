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
    [230,200,0,10],//left leg
    [270,200,350,360],//right leg
    [250,95,240,300],//head
    [108,270,45,135]]//tail

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
    [84,295,10,10],//front leg
    [209,295,10,30],//back leg
    [220,295,10,10]//other back leg
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

var coral1 = new Image()
coral1.type = "appendage"
coral1.src="Images/appendages/coral1.png"
coral1.width = 150
coral1.height=150
coral1.attachAt = [15,65]

var hand1 = new Image()
hand1.type="appendage"
hand1.src="Images/appendages/hand1.png"
hand1.attachAt=[14,11]

//textures (backgrounds, perhaps skins)
var decopaper4 = new Image()
decopaper4.src="Images/textures/decopaper4.jpg"

var decopaper7 = new Image()
decopaper7.src="Images/textures/decopaper7.jpg"

var decopaper13 = new Image()
decopaper13.src="Images/textures/decopaper13.jpg"

//data structures
var bodies = [kitty, armadillo, giraffe]
var features = [eye1, mouth,valves,suriname]
var appendages = [anemone, anemone2, anemone3,hand1]
var textures = [decopaper4,decopaper7,decopaper13]

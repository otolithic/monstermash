//define the canvas and attach it
var canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.width=document.body.getBoundingClientRect().width
canvas.height=document.body.getBoundingClientRect().height
//center the canvas on the page
var marginLeft = document.body.getBoundingClientRect().width/2 - canvas.width/2
canvas.style.marginLeft=`${marginLeft}px`

//set the context to 2D
var context = canvas.getContext("2d")

allAssets = [...bodies, ...features, ...appendages, ...textures]
var promise = new Promise(function(resolve, reject){
    //load the images
    console.log("loaded!")
    var numloaded = 0
    for(let asset of allAssets){
         asset.addEventListener('load', function() {
             numloaded++
             console.log(numloaded, asset)
             if (numloaded == allAssets.length){
                 resolve()
             }
         })
    }
        
    console.log("out of body")
})
promise.then(function(result){
    render()
    console.log("result", result)
})

function render(){
    console.log("in render")
    var bg = decopaper4
    context.drawImage(bg,0,0)
//generate which parts to use

var bodynumber = Math.round(Math.random()*(bodies.length-1))

numlimbs = bodies[bodynumber].attachments.length
maxfeats = 3
numfeatures = Math.round(Math.random()*maxfeats)

limblist = getIdxList(numlimbs,appendages)
featlist = getIdxList(numfeatures,features)

//put the parts in an array with the body first
var parts = [bodies[bodynumber]]

for (var i = 0; i < featlist.length; i++){
    parts = parts.concat(featlist[i])
}
for (var i = 0; i < limblist.length; i++){
    parts = parts.concat(limblist[i])
}

//iterate and display the parts
jointnum = 0;
for (var i = 0; i < parts.length; i++){
    img = parts[i]
    //instantiate body position
    if (i == 0) {
        xref = canvas.width/2-img.width/2
        yref = canvas.height/2-img.height/2
        xloc = xref
        yloc = yref
        angle = 0
        axisX = img.width/2
        axisY = img.width/2
    }
    
    //select feature placement
    else {
        if (parts[0].hasAttachments && img.type == "appendage"){
            jointnum++
            if (jointnum>=parts[0].attachments.length)
                jointnum = 0
            joint = parts[0].attachments[jointnum]
            
            xloc = xref + joint[0] - img.attachAt[0]
            yloc = yref + joint[1] - img.attachAt[1]
            
            angle = Math.random()*(joint[3]-joint[2])+joint[2]
            axisX = img.attachAt[0]
            axisY = img.attachAt[1]
        }
        else {
            //randomize x and y coords based on image size
            xloc = Math.round(Math.random()*(parts[0].width-img.width))+canvas.width/2-parts[0].width/2
            yloc = Math.round(Math.random()*(parts[0].height-img.height))+canvas.height/2-parts[0].height/2
            angle = Math.random()*180-90
            axisX = img.width/2
            axisY = img.width/2
        }
    }    
    
    drawPart(img, angle*Math.PI/180, xloc, yloc)
    console.log(context.globalCompositeOperation)
        
//    //uncomment to check joint locations
//    
//    if (img.hasAttachments){
//        for (var a = 0; a < img.attachments.length; a++){
//            joint = img.attachments[a]
//            rectx = xloc + joint[0]
//            recty = yloc + joint[1]
//            context.fillStyle="red"
//            context.fillRect(rectx,recty,10,10)
//        }
//    }
//    
//    
}


function drawPart(img, angle, targetPointX,targetPointY)
{
    console.log("in drawPart")
    //puts the image at the given point
    
        if (img.type=="appendage"){
            atX = img.attachAt[0]
            atY = img.attachAt[1]
            w = img.width
            h = img.height
        }
        else if (img.type=="feature"){
            atX = 0;
            atY = 0;
            r = Math.random()*0.5+0.5
            w = img.width*r
            h = img.height*r
        }
        else {
            atX = 0;
            atY = 0;
            w = img.width
            h = img.height
        }
       context.translate(targetPointX+atX,targetPointY+atY)
        context.rotate(angle)
        console.log(img)
        console.log(img.type)
        console.log(context.globalCompositeOperation)
        context.drawImage(img, -atX,-atY,w,h)
        
        context.setTransform(1, 0, 0, 1, 0, 0);
    
}

function getIdxList(num,array){
    var idxlist = []

    for (var i = 0; i < num; i++){
        idx = Math.floor(Math.random()*array.length)
        idxlist = idxlist.concat(array[idx])
    }
    
    return idxlist
}
}//end render fxn
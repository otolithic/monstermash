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

//chooses a given amount (num) of items from a given list (array)
function getIdxList(num,array){
    var idxlist = []

    for (var i = 0; i < num; i++){
        //generate a random index within the array
        idx = Math.floor(Math.random()*array.length)
        
        //add the item at this index to a list
        idxlist = idxlist.concat(array[idx])
    }
    
    return idxlist
}

function chooseBody(bodies){
    //pick a random number from the available number of body templates
    var bodynumber = Math.round(Math.random()*(bodies.length-1))
    b = bodies[bodynumber]
    return b
}

function chooseLimbs(b, appendages){
    //use this body's number of available joints to determine how many limbs to add
    numlimbs =  b.attachments.length
    
    //use getIdxList to choose this number of appendages and features. limblist and featlist should be arrays of images
    limblist = getIdxList(numlimbs,appendages)
    
    return limblist
}

function chooseFeats(maxfeats, features){
    //choose a random number of "features" to place between 0 and a maximum number (suggested: 3)
    numfeatures = Math.round(Math.random()*maxfeats)
    
     //use getIdxList to choose this number of appendages and features. limblist and featlist should be arrays of images
    featlist = getIdxList(numfeatures,features)
    
    return featlist
}

function chooseTexture(textures){
    var texturenumber = Math.floor(Math.random()*textures.length)
    t = textures[texturenumber]
    return t
}

/******************************************************\
            THIS IS WHERE IT ALL HAPPENS
\******************************************************/
function render(){
    console.log("in render")
    
    //draw background
    var bg = chooseTexture(textures)
    context.drawImage(bg,0,0)
    
    //choose the parts    
    b = chooseBody(bodies)
    l = chooseLimbs(b, appendages)
    f = chooseFeats (3, features)
    
    //instantiate body position
    xref = canvas.width/2-b.width/2
    yref = canvas.height/2-b.height/2
    xloc = xref
    yloc = yref
    angle = 0
    axisX = b.width/2
    axisY = b.width/2
    
    drawPart(b, angle*Math.PI/180, xloc, yloc)
    
    //select limb placement
    jointnum = 0;
    for (var i = 0; i < l.length; i++){
        limb = l[i]
        joint = b.attachments[jointnum]

        xloc = xref + joint[0] - limb.attachAt[0]
        yloc = yref + joint[1] - limb.attachAt[1]

        angle = Math.random()*(joint[3]-joint[2])+joint[2]
        axisX = limb.attachAt[0]
        axisY = limb.attachAt[1]
        
        jointnum++
        
        drawPart(limb, angle*Math.PI/180, xloc, yloc)
    }
    
    //select feature placement
    for (var i=0; i<f.length; i++){
        feat = f[i]
        
        //randomize x and y coords based on image size
        xloc = Math.round(Math.random()*(b.width-feat.width))+canvas.width/2-b.width/2
        yloc = Math.round(Math.random()*(b.height-feat.height))+canvas.height/2-b.height/2
        angle = Math.random()*180-90
        axisX = feat.width/2
        axisY = feat.width/2
        
        drawPart(feat, angle*Math.PI/180, xloc, yloc)
    }
    
    //    //uncomment to check joint locations, replace img with limb or feat
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

    function drawPart(p, angle, targetPointX,targetPointY)
    {
        console.log("in drawPart")
        //puts the image at the given point

            if (p.type=="appendage"){
                atX = p.attachAt[0]
                atY = p.attachAt[1]
                w = p.width
                h = p.height
            }
            else if (p.type=="feature"){
                atX = 0;
                atY = 0;
                r = Math.random()*0.5+0.5
                w = p.width*r
                h = p.height*r
            }
            else {
                atX = 0;
                atY = 0;
                w = p.width
                h = p.height
            }
           context.translate(targetPointX+atX,targetPointY+atY)
            context.rotate(angle)
            console.log(p)
            console.log(p.type)
            console.log(context.globalCompositeOperation)
            context.drawImage(p, -atX,-atY,w,h)

            context.setTransform(1, 0, 0, 1, 0, 0);

    }
}//end render fxn
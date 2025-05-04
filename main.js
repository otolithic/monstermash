//define the canvas and attach it
const canvas = document.createElement("canvas")
document.body.appendChild(canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//set the context to 2D
const context = canvas.getContext("2d")

// Show loading indicator
const loadingIndicator = document.getElementById("loading")
loadingIndicator.style.display = "block"

// Select all random parts ONCE and reuse
const selectedParts = {
    bg: chooseTexture(textures),
    body: chooseBody(bodies)
};
selectedParts.limbs = chooseLimbs(selectedParts.body, appendages);
selectedParts.features = chooseFeats(3, features);

const requiredAssets = [
    selectedParts.bg,
    selectedParts.body,
    ...selectedParts.limbs,
    ...selectedParts.features
];

function loadAssets(assets) {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        let hasError = false;
        const totalAssets = assets.length;

        assets.forEach(asset => {
            // If already loaded, count it
            if (asset.complete && asset.naturalWidth !== 0) {
                loadedCount++;
                if (loadedCount === totalAssets) resolve();
            } else {
                asset.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalAssets) resolve();
                };
                asset.onerror = () => {
                    if (!hasError) {
                        hasError = true;
                        reject(new Error("Failed to load an image asset."));
                    }
                };
            }
        });
    });
}

//chooses a given amount (num) of items from a given list (array)
function getIdxList(num, array) {
    const idxlist = []
    for (let i = 0; i < num; i++) {
        //generate a random index within the array
        const idx = Math.floor(Math.random() * array.length)
        //add the item at this index to a list
        idxlist.push(array[idx])
    }
    return idxlist
}

function chooseBody(bodies) {
    //pick a random number from the available number of body templates
    const bodynumber = Math.round(Math.random() * (bodies.length - 1))
    return bodies[bodynumber]
}

function chooseLimbs(b, appendages) {
    //use this body's number of available joints to determine how many limbs to add
    const numlimbs = b.attachments.length
    //use getIdxList to choose this number of appendages and features. should be array of images
    return getIdxList(numlimbs, appendages)
}

function chooseFeats(maxfeats, features) {
    //choose a random number of "features" to place between 0 and a maximum number (suggested: 3)
    const numfeatures = Math.round(Math.random() * maxfeats)
    //use getIdxList to choose this number of appendages and features. should be array of images
    return getIdxList(numfeatures, features)
}

function chooseTexture(textures) {
    const texturenumber = Math.floor(Math.random() * textures.length)
    return textures[texturenumber]
}

function drawPart(p, angle, targetPointX, targetPointY) {
    let atX, atY, w, h
    
    if (p.type === "appendage") {
        atX = p.attachAt[0]
        atY = p.attachAt[1]
        w = p.width
        h = p.height
    } else if (p.type === "feature") {
        atX = 0
        atY = 0
        const r = Math.random() * 0.5 + 0.5
        w = p.width * r
        h = p.height * r
    } else {
        atX = 0
        atY = 0
        w = p.width
        h = p.height
    }
    
    context.translate(targetPointX + atX, targetPointY + atY)
    context.rotate(angle)
    context.drawImage(p, -atX, -atY, w, h)
    context.setTransform(1, 0, 0, 1, 0, 0)
}

/******************************************************\
            THIS IS WHERE IT ALL HAPPENS
\******************************************************/
async function render() {
    try {
        await loadAssets(requiredAssets);

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background: fit width, crop height
        const bg = selectedParts.bg;
        const scale = canvas.width / bg.width;
        const drawHeight = bg.height * scale;
        context.drawImage(bg, 0, 0, canvas.width, drawHeight);

        // Center monster on canvas
        const b = selectedParts.body;
        const xref = canvas.width/2 - b.width/2;
        const yref = canvas.height/2 - b.height/2;
        let xloc = xref;
        let yloc = yref;
        const angle = 0;

        drawPart(b, angle * Math.PI / 180, xloc, yloc);

        // Draw limbs
        let jointnum = 0;
        for (const limb of selectedParts.limbs) {
            const joint = b.attachments[jointnum];
            xloc = xref + joint[0] - limb.attachAt[0];
            yloc = yref + joint[1] - limb.attachAt[1];
            const angle = Math.random() * (joint[3] - joint[2]) + joint[2];
            drawPart(limb, angle * Math.PI / 180, xloc, yloc);
            jointnum++;
        }

        // Draw features
        for (const feat of selectedParts.features) {
            xloc = Math.round(Math.random() * (b.width - feat.width)) + xref;
            yloc = Math.round(Math.random() * (b.height - feat.height)) + yref;
            const angle = Math.random() * 180 - 90;
            drawPart(feat, angle * Math.PI / 180, xloc, yloc);
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
        
        // Hide loading indicator
        loadingIndicator.style.display = "none";
    } catch (error) {
        console.error("Error rendering monster:", error);
        loadingIndicator.textContent = "Error loading monster. Please refresh.";
    }
}

// Start the rendering process
render();

// Update canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render(); // re-render the monster to fit the new size
});
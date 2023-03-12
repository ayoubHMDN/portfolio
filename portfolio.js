// constants
const workCount = 26
const path = 'images/slider/'
const extension = 'png'
let imageSources = [] 
for(let i=1; i<=workCount; i++){
    imageSources= [...imageSources, `work${i}.${extension}`]
}
let visibleImages = workCount<6 ? workCount : 6

// DOM elements
let moreBtn = document.querySelector('#more-btn')
let imagesContainer = document.querySelector('#images-container')
let closeViewerBtn = document.querySelector('#close-viewer-btn')
let viewerContainer = document.querySelector('#viewer-container')
let viewer = document.querySelector('#viewer')

// functions
let createImg = (src) => {
    let img = document.createElement('img')
    img.src = path + src
    img.id = `img-${src}`
    return img
}

let appendElement = (element, parent) => {
    parent.appendChild(element)
}

let createHoverLayer = (id) => {
    let layer = document.createElement('div')
    layer.addEventListener('click', ()=>{
        showInViewer(`img-${id}`)
    })
    layer.classList.add('hover-layer')
    layer.id = `layer-${id}`

    let layerBtn = document.createElement('button')
    layerBtn.addEventListener('click', (e)=>{
        e.stopPropagation()
        showInViewer(`img-${id}`)
    })
    layerBtn.id = `btn-${id}` 
    layerBtn.innerText = 'See full image'
    layer.appendChild(layerBtn)
    return layer
}

let showImages = (visibleCount)=>{
    imagesContainer.innerHTML = ''
    for(let i = 0; i<visibleCount; i++){
        let div = document.createElement('div')
        div.classList.add('images-grid-img')
        imageSources[i] && appendElement(createImg(imageSources[i]), div)
        imageSources[i] && appendElement(createHoverLayer(imageSources[i]), div)
        imageSources[i] && appendElement(div, imagesContainer)
    }
    
    if(visibleCount == workCount) {
        moreBtn.style.display = 'none'
    }

}

let showAllImages = ()=>{
    if(visibleImages<workCount){
        visibleImages = workCount
    }
    showImages(visibleImages)
    moreBtn.style.display = 'none'
}

let openViewer = () => {
    viewerContainer.style.display = 'flex'
}

let closeViewer = () => {
    viewerContainer.style.display = 'none'
}

let showInViewer = (imgId) => {
    viewer.innerHTML = ''
    let img = document.getElementById(imgId)
    let imgCopy = img.cloneNode(false)
    viewer.appendChild(imgCopy)
    openViewer()
}



// init
moreBtn.addEventListener('click', ()=>{
    showAllImages()
})

closeViewerBtn.addEventListener('click', ()=>{
    closeViewer()
})

showImages(visibleImages)
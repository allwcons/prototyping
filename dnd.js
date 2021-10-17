
function createBox(bg){
    let code = ` 
    <div class="widget">
        <div class="tag">
            <div class="box ${bg ? bg:"primary"}">
        </div>
        </div>
        <div class="modifier">
            <div class="resizer">
                <div class="handle left top"></div>
                <div class="handle top right"></div>
                <div class="handle bottom left"></div>
                <div class="handle bottom right"></div>

                <div class="line left"></div>
                <div class="line right"></div>
                <div class="line bottom"></div>
                <div class="line top"></div>
            </div>
        </div>
    </div>`
    let elt = document.createElement("div")
    elt.innerHTML = code
    return elt.children[0]
}

function handleDragStart(e) {
    container.addEventListener("dragover",handleDragOver)
    container.addEventListener("drop",handleDrop)
    e.dataTransfer.effectAllowed = 'move';
    let jsonobj = `{"type":"box","bg":"${this.dataset.bg}"}`
    e.dataTransfer.setData('text/html', jsonobj);
}

function handleDragOver(e) {
    e.preventDefault()
}

function handleDrop(e) {
    e.stopPropagation();
    let data = e.dataTransfer.getData("text/html")
    try{
        let data_obj = JSON.parse(data)
        if(data_obj.type == "box"){
            let elt = createBox(data_obj.bg)
            let containerRect = container.getBoundingClientRect()
            let width = 100
            let height = 100
            container.appendChild(elt)
            elt.style.left = e.pageX - containerRect.left - width / 2 + "px"
            elt.style.top = e.pageY - containerRect.top - height / 2 + "px"
            reRender()
        }
    }catch{
    }
    container.removeEventListener("dragover",handleDragOver)
    container.removeEventListener("drop",handleDrop)
    return false;
}

const widgetbar = document.querySelector(".widget-bar")
const container = document.querySelector(".container")
const children = [...widgetbar.children]
children.forEach(child=>{
    child.addEventListener("dragstart",handleDragStart)
})

document.onkeydown = (e)=>{
    let key = e.keyCode || e.charCode
    if (key == 46){
        let active = document.querySelectorAll(".selected")
        let parentNode = active[0].parentNode
        active.forEach(el=>{
            el.parentNode.removeChild(el)
        })
    }
}


function onDrag(elt1,func,relative) {
    let pos = { x: null, y: null }
    if(!relative){
    	var elt = elt1.parentElement.parentElement
    }else{
    	var elt = elt1
    }
    function handleMouseDown(e) {
        let startCutX = e.pageX - elt.offsetLeft
        let startCutY = e.pageY - elt.offsetTop

        function handleMouseMove(e) {
        	pos.x = e.pageX - startCutX
	        pos.y = e.pageY - startCutY
        	if(!func){
	        	elt.style.left = pos.x + "px"
	        	elt.style.top = pos.y + "px"
	        }else{
	        	func(pos.x,pos.y)
	        }
        }

        document.addEventListener("mousemove",handleMouseMove)

        document.addEventListener("mouseup",()=>{
        	document.removeEventListener("mousemove",handleMouseMove)
        })

    }
    elt1.addEventListener("mousedown",handleMouseDown)
}


Array.prototype.includeItems = function(arr) {
	for(let i = 0;i<arr.length;i++){
		let r = this.includes(arr[i])
		if(r) return true
	}
	return false
};


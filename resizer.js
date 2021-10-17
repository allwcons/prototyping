function useResizer(widget){
	//circle
	let topleft = widget.querySelector(".top.left") 
	let topright = widget.querySelector(".top.right") 
	let bottomleft = widget.querySelector(".bottom.left") 
	let bottomright = widget.querySelector(".bottom.right")
	let handles = widget.querySelectorAll(".handle")

	//line
	let lines = widget.querySelectorAll(".line")
	let top = widget.querySelector(".top.line")
	let right = widget.querySelector(".line.right") 
	let left = widget.querySelector(".line.left") 
	let bottom = widget.querySelector(".bottom.line")




	let original_width = null;
  	let original_height = null;
  	let original_x = null;
  	let original_y = null;
  	let original_mouse_x = null;
  	let original_mouse_y = null;

  	let parentElement = widget.parentElement
  	let parentRect = parentElement.getBoundingClientRect()
  	let offset = {left:parentRect.left,top:parentRect.top}

  	const setWidth = (w)=>{
  		widget.style.width = w + "px"
  	}
  	const setHeight = (h)=>{
  		widget.style.height = h + "px"
  	}
  	const setPos = (x,y)=>{
  		if(x) widget.style.left = x - offset.left  + "px"
  		if(y) widget.style.top = y - offset.top + "px"
  	}
  	lines.forEach(line=>{
  		line.addEventListener("mousedown",(e)=>{
  			e.preventDefault()
  			original_width = parseFloat(getComputedStyle(widget,null).getPropertyValue("width").replace("px",""))
  			original_height = parseFloat(getComputedStyle(widget,null).getPropertyValue("height").replace("px",""))
  			original_x = widget.getBoundingClientRect().left
  			original_y = widget.getBoundingClientRect().top
  			original_mouse_x = e.pageX
  			original_mouse_y = e.pageY

  			window.addEventListener("mousemove",resize)
  			window.addEventListener("mouseup",stopResize)
  		})
  		function resize(e){
  			if(line == right){
  				let width =  original_width + (e.pageX - original_mouse_x)
  				setWidth(width)
  			}else if(line == bottom){
  				let height =  original_height + (e.pageY - original_mouse_y)
  				setHeight(height)
  			}else if(line == top){
  				let height =  original_height - (e.pageY - original_mouse_y)
  				let y = original_y + (e.pageY - original_mouse_y)
  				setHeight(height)
  				setPos(null,y)		
  			}else if(line == left){
  				let width =  original_width - (e.pageX - original_mouse_x)
  				let x = original_x + (e.pageX - original_mouse_x)
  				setWidth(width)
  				setPos(x)
  			}
  		}
  		function stopResize(argument) {
  			window.removeEventListener("mousemove",resize)
  		}
  	})
  	handles.forEach(handle=>{
  		handle.addEventListener("mousedown",(e)=>{
  			e.preventDefault()
  			original_width = parseFloat(getComputedStyle(widget,null).getPropertyValue("width").replace("px",""))
  			original_height = parseFloat(getComputedStyle(widget,null).getPropertyValue("height").replace("px",""))
  			original_x = widget.getBoundingClientRect().left
  			original_y = widget.getBoundingClientRect().top
  			original_mouse_x = e.pageX
  			original_mouse_y = e.pageY

  			window.addEventListener("mousemove",resize)
  			window.addEventListener("mouseup",stopResize)
  		})
  		function resize(e){
  			if(handle == bottomright){
  				let width =  original_width + (e.pageX - original_mouse_x)
  				let height =  original_height + (e.pageY - original_mouse_y)
  				setWidth(width)
  				setHeight(height)
  			}else if(handle == bottomleft){
  				let width =  original_width - (e.pageX - original_mouse_x)
  				let height =  original_height + (e.pageY - original_mouse_y)
  				let x = (original_x) + (e.pageX - original_mouse_x)
  				setWidth(width)
  				setHeight(height)
  				setPos(x)		
  			}else if(handle == topright){
  				let width =  original_width + (e.pageX - original_mouse_x)
  				let height =  original_height - (e.pageY - original_mouse_y)
  				let y = original_y + (e.pageY - original_mouse_y)
  				setWidth(width)
  				setHeight(height)
  				setPos(null,y)		
  			}else if(handle == topleft){
  				let width =  original_width - (e.pageX - original_mouse_x)
  				let height =  original_height - (e.pageY - original_mouse_y)
  				let y = original_y + (e.pageY - original_mouse_y)
  				let x = original_x + (e.pageX - original_mouse_x)
  				setWidth(width)
  				setHeight(height)
  				setPos(x,y)
  			}
  		}
  		function stopResize(argument) {
  			window.removeEventListener("mousemove",resize)
  		}
  	})
}

function reRender(){
	let boxes = document.querySelectorAll(".tag .box")
	boxes.forEach(box=>{
		onDrag(box)
		useResizer(box.parentElement.parentElement)
	})

	document.addEventListener("mousedown",(e)=>{
		let elt = e.target
		try{
			let widget = elt.parentElement.parentElement
			if(elt.classList.contains("handle") || elt.classList.contains("line")){
				widget = widget.parentElement
			}
			if([...elt.classList].includeItems(["box","handle","line"])){
				boxes.forEach(el=>{
					let widget = el.parentElement.parentElement
					widget.classList.remove("selected")
				})
				widget.classList.add("selected")
			}else{
				boxes.forEach(el=>{
					widget = el.parentElement.parentElement
					widget.classList.remove("selected")
				})
			}
		}catch{}

	})
}
reRender()
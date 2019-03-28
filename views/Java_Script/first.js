// function BigImg(){
// 	x = document.getElementById('x');
// 	x.style.width="760px"
// 	x.style.height="760px";
// }

// function normalImg(){
// 	x = document.getElementById('x');
// 	x.style.width="720px"
// 	x.style.height="720px";
// }

window.onscroll = function(){
	if(document.documentElement.scrollTop > 80){
		document.getElementById('navvbar').style.background ="black";
		document.getElementById('navvbar').style.padding = "30px 10px";
	}else{
		document.getElementById('navvbar').style.background ="white";
		document.getElementById('navvbar').style.padding = "30px 10px";
	}
}



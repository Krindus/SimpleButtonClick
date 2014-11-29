#pragma strict

//This script is was made in order to replace the built in GUI with a customized 3d gui using gameobjects. 
//This is fairly simple and can be used on mobile or pc without any change.
//not sure it exactly demonstrates object orienteering like you were describing as these are just simple proceedural calls.
var currentbutton : Transform = null;


function Update () {

	// (1/3) When the player clicks on a button
	if (Input.GetButtonDown("Fire1")){
		PushButtonDown(DoRaycast());
	}
	//(2/3) When a player releases a clicked button
	if (Input.GetButtonUp("Fire1")){
		PullButtonUp(DoRaycast());
	}
	//(3/3) Called so long as player continues to hold down finger or mouse on button
	if (Input.GetButton("Fire1")){
		ButtonStayClicked(DoRaycast());
	}
	
}


//raycast function to be called for button press purposes
function DoRaycast(){
	var clickray : Ray = camera.main.ScreenPointToRay (Input.mousePosition);
	var clickhit : RaycastHit;
	if (Physics.Raycast(clickray, clickhit, 50)){
		if (clickhit.transform.tag == "Button"){
			return (clickhit.transform);
		}
		else return;
	}
	else return;
}


//(1/3)
function PushButtonDown(hit : Transform){
	if (hit){
		currentbutton = hit;
		PressButton(hit);
	}
}

//(2/3)
//actions occur on the button release as apposed to the click, to allow for cancelation.
function PullButtonUp(hit : Transform){
	if (hit){
		if (hit == currentbutton){
			ReleaseButton(hit);
			//Do the button action thing.
			currentbutton = null;
		}
	}
}

//(3/3)
//if player holds mouse or finger down and moves away from button, button does not click and instead resets.
//this would be for the purposes of a player clicking the wrong button and being able to change his mind afterwards.
function ButtonStayClicked(hit : Transform){ 
	if (!hit){
		if (currentbutton){	
			ReleaseButton(currentbutton);
			currentbutton = null;
		}
	}
}


//movement of buttons
//simple button position movement for the purpose of displaying a button motion when pushed or released.
function PressButton(hit : Transform){
	hit.localPosition.z += .4;
}
function ReleaseButton(hit : Transform){
	hit.localPosition.z -= .4;
}

















//fin
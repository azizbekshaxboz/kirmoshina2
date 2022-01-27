// VARIABLES ―――――――――――――――――――――――――

const washSpeed = 600; // If changed, need to be updated in the CSS as well
const washingMachine = document.getElementById('washingMachine');
const screen = document.getElementById('controls');

const status = {
	opening: {
		isActive: true,
		statusClass: 'isOpen',
		controller: document.getElementById('opening'),
		controllerLabel: ["CLOSE", "OPEN"]
	},
	content: {
		isActive: true,
		statusClass:'isFilled',
		controller: document.getElementById('content'),
		controllerLabel: ["EMPTY", "FILL"]
	},
	power: {
		isActive: false,
		statusClass: 'isWashing',
		controller: document.getElementById('power'),
		controllerLabel: ["STOP", "START"]
	}
};


// PLAYGROUND ―――――――――――――――――――――――――

for (let action in status) {
	const { statusClass, controller, controllerLabel } = status[action];
	
	controller.addEventListener('click', function(event) {
		const { isActive } = status[action];
		washingMachine.classList.toggle(statusClass);
		this.innerHTML = controllerLabel[isActive*1];
		
		if(action === "power" && !isActive) { // Slow start
			washingMachine.classList.add(statusClass);
			washingMachine.classList.add("isStarting");
			setTimeout(() => { washingMachine.classList.remove("isStarting"); }, washSpeed * 2);
		}
		
		status[action].isActive = !isActive;
		
		setTimeout(function() {
			updateMachine();
		}, 100); // Timeout needed because of a bug on FF when updating innerHTML
	});
}

function updateMachine() {	
	const { opening, content, power } = status;
	
	// Update playground
	
	opening.controller.disabled = power.isActive;
	content.controller.disabled = !opening.isActive;
	power.controller.disabled = opening.isActive || !content.isActive;
	
	// Update screen text
	
	if(power.isActive) {
		screen.innerHTML = "💦"
	} else if(!content.isActive) {
		screen.innerHTML = "EMPTY";
	} else if (opening.isActive) {
			screen.innerHTML = "🙃";
	} else {
		screen.innerHTML = "READY";
	}
}
/**
 * @file MMM-WaterReminder.js
 *
 * @author thiagomides
 * @license MIT
 *
 * @see  https://github.com/fewieden/MMM-AlarmClock
 */


Module.register("MMM-WaterReminder", {

	defaults: {
		foo: "Did you have enough water today?",
		phrases: ["Did you have enough water today?", "Hey buddy, you should have some water!","Drink water, bro.","'Better to have stones in the way than in the Kidneys: Drink water!'",
		"It's been such a long time since your last glass of water...","Water! Water! Water!","Are you anxious for the next glass of water?"],
		additionalPhrases: [],
		startTime: "00:00",
		endTime: "23:59",
		messageDuration: 1 * 1 * 1000,
		animationSpeed: 4 * 1000,
		reminderFrequency: 1 * 10 * 1000,
		classes: "",
		color: "#fff",
		idleMessage: "<br/>",
		logo: true,
		alarm: {
			status: false, 
			src: "done-for-you.mp3",
			startTime: "09:00",
			endTime: "17:00",
		}
		
	},

	// Define required scripts.
	getStyles: function () {
		return ["font-awesome.css","moment.js"];
	},


	start: function (){
		if (this.config.logo)	this.logo =  " " + "<p class='xsmall dimmed regular'> <i class=' dimmed fa fa-glass-whiskey'></i>  MMM-Water-Reminder  </p>" 
		else this.logo = " ";
		if (this.config.additionalPhrases) this.config.phrases.push(this.config.additionalPhrases);
		this.message = this.config.foo + this.logo
		this.lastphraseIndex = 0 
		this.remainderController = 0
		this.timeLeft = 0
		this.config.reminderFrequency = Math.round(this.config.reminderFrequency/this.config.animationSpeed) 
		this.format = 'hh:mm'


	},

	audioPlay: function (){

		var time = moment(moment(),this.format),
		beforeTime = moment(this.config.alarm["startTime"], this.format),
		afterTime = moment(this.config.alarm["endTime"], this.format);


		if (time.isBetween(beforeTime, afterTime)) {
			var audio = document.createElement('audio');
			audio.style.display = "none";
			audio.src = this.file("sounds/"+this.config.alarm["src"]);
			audio.volume = 0.5;

			audio.load();
			audio.autoplay = true;
			audio.onended = function(){
				audio.remove() //Remove when played.
			};
		}	

	},
	getDom: function() {
		var element = document.createElement("div")
		element.className = this.config.classes ? this.config.classes: "bright medium light"
		var subElement = document.createElement("span")
		subElement.innerHTML = this.message
		subElement.style.color = this.config.color
		element.appendChild(subElement)

		return element
	},

	randomPhrase: function (phrases,timeLeft) {
		if (phrases.length === 1) {
			return phrases[0];
		}

		if (timeLeft != 0) return  phrases[this.lastphraseIndex];
		else {
			var timer = setTimeout(()=>{ if(this.config.alarm["status"]) this.audioPlay() }, this.config.animationSpeed/2)
		} 

		var generate = function () {
			return Math.floor(Math.random() * phrases.length);
		};

		var phraseIndex = generate();

		while (phrases[phraseIndex] === phrases[this.lastphraseIndex]) {
			phraseIndex = generate();
		}

		this.lastphraseIndex = phraseIndex;

		return  phrases[phraseIndex];
	},

	textSwitcher: function(){
		var time = moment(moment(),this.format),
		beforeTime = moment(this.config.startTime, this.format),
		afterTime = moment(this.config.endTime, this.format);


		if ((this.remainderController % this.config.reminderFrequency == 0) && (time.isBetween(beforeTime, afterTime))){
		    this.message = this.randomPhrase(this.config.phrases,this.timeLeft) + this.logo
		    if (this.timeLeft <  Math.round(this.config.messageDuration/this.config.animationSpeed)){
		    	this.remainderController-- 
		    	this.timeLeft++
		    } else {
		    	this.remainderController = 0
		    	this.timeLeft = 0
		    }

		} else {
			if (this.config.logo)	this.message =  this.config.idleMessage +  this.config.idleMessage
			else this.message = this.config.idleMessage
		}
 	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case "DOM_OBJECTS_CREATED":

				var timer = setInterval(()=>{
					this.remainderController++
					this.textSwitcher()
					this.updateDom(this.config.animationSpeed)
				}, this.config.animationSpeed)
			break
	}
},
})
		

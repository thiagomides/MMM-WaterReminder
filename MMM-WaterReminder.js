/**
 * @file MMM-WaterReminder.js
 *
 * @author thiagomides
 * @license MIT
 *
 * @see  https://github.com/thiagomides/MMM-WaterReminder
 */


Module.register("MMM-WaterReminder", {

	reminderController : 0,
	lastphraseIndex : 0,
	reminderController : 0,
	timeLeft : 0,

	defaults: {
		foo: "Did you have enough water today?",
		phrases: ["Did you have enough water today?", "Hey buddy, you should have some water!","Drink water, bro.","'Better to have stones in the way than in the Kidneys: Drink water!'",
		"It's been such a long time since your last glass of water...","Water! Water! Water!","Are you anxious for the next glass of water?"],
		additionalPhrases: [],
		startTime: "00:00",
		endTime: "23:59",
		messageDuration: 1 * 60 * 1000, // 1 min showing on the screen
        animationSpeed: 4 * 1000, // 4 seconds for fading
        reminderFrequency: 60 * 60 * 1000, // hourly reminder
        classes: "bright medium light",
		color: "#fff",
		idleMessage: "<br/>",
		logo: true,
		days: [0,1,2,3,4,5,6],
		alarm: {
			status: false, 
			daysWithAudibleReminder: [0],
			src: "done-for-you.mp3",
			startTime: "09:00",
			endTime: "17:00",
		}
		
	},

	// Define required styles.
	getStyles: function () {
		return ["font-awesome.css"];
	},
	
	// Define required scripts.
	getScripts: function () {
		return ["moment.js"];
	},

	start: function (){
		this.logo = " ";

		if (this.config.logo)	this.logo =  " " + "<p class='xsmall dimmed regular'> <i class=' dimmed fa fa-glass-whiskey'></i>  MMM-Water-Reminder  </p>";
		if (this.config.additionalPhrases) this.config.phrases.push(this.config.additionalPhrases);
		
		this.message = this.config.foo + this.logo;
		this.config.reminderFrequency = Math.round(this.config.reminderFrequency/this.config.animationSpeed);
		this.format = 'hh:mm';

		if (this.config.alarm["status"]) this.config.alarm["daysWithAudibleReminder"] = this.config.alarm["daysWithAudibleReminder"].length > 0 ? this.config.alarm["daysWithAudibleReminder"]: this.config.days;
		else this.config.alarm["daysWithAudibleReminder"] = [];

	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case "DOM_OBJECTS_CREATED":

				var timer = setInterval(()=>{
					this.reminderController++;
					this.textSwitcher();
					this.updateDom(this.config.animationSpeed);
				}, this.config.animationSpeed);
			break;
		}
	},

	reminderSound: function (){

		var audio = document.createElement('audio');
		audio.style.display = "none";
		audio.src = this.file("sounds/"+this.config.alarm["src"]);
		audio.volume = 0.5;

		audio.load();
		audio.autoplay = true;

		audio.onended = function(){
			audio.remove() 
		};
		
	},

	getDom: function() {

		var element = document.createElement("div");
		element.className = this.config.classes ? this.config.classes: "bright medium light";

		var subElement = document.createElement("span");
		subElement.innerHTML = this.message;
		subElement.style.color = this.config.color;
		
		element.appendChild(subElement);

		return element;
	},

	randomPhrase: function (phrases,timeLeft) {
		if (phrases.length === 1) {
			return phrases[0];
		}

		if (timeLeft != 0) return	phrases[this.lastphraseIndex];
		
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


	isBetween: function(days,startTime,endTime){
		
		var IsValidDay = false;
		let now = moment();

		for (var i = days.length - 1; i >= 0; i--) {
			if (now.weekday() == days[i]) IsValidDay = true;
		}

		if (!IsValidDay) return 0;
		
		time = moment(moment(),this.format);
		beforeTime = moment(startTime, this.format);
		afterTime = moment(endTime, this.format);

		if (time.isBetween(beforeTime, afterTime)) return 1;	
		

		return 0;
		
	},

	textSwitcher: function(){
	
		if ((this.reminderController % this.config.reminderFrequency == 0) && (this.isBetween(this.config.days, this.config.startTime, this.config.endTime))){

		    this.message = this.randomPhrase(this.config.phrases,this.timeLeft) + this.logo

		    if (this.isBetween(this.config.alarm["daysWithAudibleReminder"], this.config.alarm["startTime"], this.config.alarm["endTime"]) && (this.timeLeft == 1)) this.reminderSound();

		    if (this.timeLeft <  Math.round(this.config.messageDuration/this.config.animationSpeed)){
		    	this.reminderController--;
		    	this.timeLeft++;
		    } else {
		    	this.reminderController = 0;
		    	this.timeLeft = 0;
		    }

		} else {
			if (this.config.logo)	this.message =  this.config.idleMessage +  this.config.idleMessage;
			else this.message = this.config.idleMessage;
		}
 	},

})
		

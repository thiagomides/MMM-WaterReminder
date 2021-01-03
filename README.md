# MMM-WaterReminder ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

A simple and configurable Water Reminder Module for MagicMirror<sup>2</sup>  

## Example

![Module working](.github/screenshot.png)  


## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)

## Installation

* Clone this repo into `~/MagicMirror/modules` directory.
* Configure your `~/MagicMirror/config/config.js`:

## Minimal configuration
```js
{
    module: 'MMM-WaterReminder',
    position: 'top_center',
    config: {
        foo: "Hey buddy, you should have some water!",
        additionalPhrases: ["Drink water!"],
        alarm: {
            status: true, 
            src: "done-for-you.mp3",
            ...
        },
        ...
    }
}
```

## Personalized configuration
this is the default configuration defined if you don't define any value
```js
{
    module: 'MMM-WaterReminder',
    position: 'top_center',
    config: {
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
            daysWithAudibleReminder: [1,2,3,4,5],
            src: "done-for-you.mp3",
            startTime: "09:00",
            endTime: "17:00",
        }
    }
}
```
## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `foo` | `Did you have enough water today?` | This is the module initialization message
| `phrases` | `["Did you have enough water today?", ... , "Are you anxious for the next glass of water?"]` | An array of phrases that will be randomly displayed. 
| `additionalPhrases` | `[]` | An array of phrases to be used with the default array of phrases. 
| `days` | Days of the week that the reminder should work . <br/>``0 => Sunday, 1 => Monday, 2 => Tuesday, 3 => Wednesday, 4 => Thursday, 5 => Friday, 6 => Saturday``<br/><br/> **Example (workdays) :** ``[1, 2, 3, 4, 5], // From Monday to Friday .`` |
| `startTime` | `00:00` | The time that the module will start to work. 
| `endTime` | `23:59` | The time that the module will stop to work. 
| `messageDuration` | `60000` (1 min) |  How long does the reminder should remain on the screen?  
| `animationSpeed` | `4000` (4 sec) | Speed of the update animation. 
| `reminderFrequency` | `1800000` (30 min) | How often does the reminder should appear?
| `classes` | `bright medium light` | Override the CSS classes of the div showing the reminder.
| `color` | `#fff` | Sets the color of the reminder.
| `idleMessage` | `</br>` | Text displayed during the idle time, that is, before and after a reminder. 
| `logo` | `true` | If you are using a touch screen device you need to press a button to disable an alarm.. |


##  Audible Reminder Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `status` | `false` | Enable or disable audible reminder |
| `startTime` | `09:00` | Time at which the reminder should start to sound. e.g.,  reminder should sound only during working hours. |
| `endTime` | `17:00` | Time at which the reminder should stop to sound. e.g., time to get off from the work |
| `daysWithAudibleReminder` | `[]` | Days of the week that the reminder should display a sound. If  `status = true` and the sound option `daysWithAudibleReminder = []` is empty, the sound will be displayed following the value in `days` |
| `src` | `done-for-you.mp3` | Name or the url of the mp3 file. By default, the sound of the config will be use if this option is empty. |


## Default Sound

The alarm sound for this module is `done-for-you.mp3`. However, additional sounds can be placed on the `sounds/` folder:

* [done-for-you.mp3](https://notificationsounds.com/notification-sounds/done-for-you-612) | From Notification Sounds licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)


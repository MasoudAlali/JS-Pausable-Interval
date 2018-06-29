# JavaScript Pausing Interval

Light-Weight simple Interval with some usefull functionalities

## Install
- Just add `PausingInterval.js` to your project or `copy` the content
- There are `Class` version and `Function as a Constructor` version

## Functions

- For Instantiation
```javascript
  var myInterval = new PausingInterval(callback, delay);
```

- Pasue & Resume
```javascript
  myInterval.pause();
  myInterval.resume();
```

- Change Callback or Delay
```javascript
  myInterval.changeCallback(newCallback);
  myInterval.changeDelay(newDelay);
```

- Pause for Specific Amount of Time
```javascript
  myInterval.pauseFor(ms);
```

- Clear Interval
```javascript
  myInterval.clear()
```

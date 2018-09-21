# JavaScript Pausable Interval

Light-Weight simple Interval with some usefull functionalities

## Install
- Just add `index.js` to your project or `copy` the content
- or easily
```bash
    npm i js-pausable-interval --save
```
- There are `Class` version and `Function as a Constructor` version

## Functions

- For Instantiation
```javascript
  // ES6
  import PausableInterval from 'js-pausable-interval';
  // ES5
  const PausableInterval = require('js-pausable-interval');
  
  const myInterval = new PausableInterval(callback, delay);
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

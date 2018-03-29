## Events Manager

Events Manager is a tool which allows to manipulate hadron's default behaviour without need to change the code base. It can be achived via custom 'listeners' defined by the developer. There are bunch of breakpoints spreaded all over the hadron framework where listeners can be hooked up.

### Events Manager installation
Install **hadron-events-manager** package using npm
```bash
$ npm install --save hadron-events-manager
```

Import **hadron-events-manager** package into our *index.js* file and include it inside hadron constructor:
```javascript
// index.js
import hadronEventsManager from 'hadron-events-manager'

// [...]

hadron(app, [
  hadronEventsManager
], config).then(container => {
  console.log('Hadron with Hadron Events Manager initialized');
})
```

Instance of Hadron Event Manager will sit in the container when **hadron-events-manager** package will be registered in hadron core.  

##Hadron Events Manager

Hadron Events Manager instance has two methods on it:  

**registerEvents(listeners)**

- registers listeners to their events.
- arguments:
    * listeners: array of objects which have to follow convention showed below:
```javascript
{
  name: 'string',  // listener name
  event: 'string', // event to register to
  handler: 'function' // function to handle the event
}
```  
  
    
**emitEvent(eventName)**  

- calls all listeners handlers registered for event with event name passed to it.
- arguments:
    * eventName: name of the event which will be fired.
   
##Listeners

You can create your listeners in main config file.

As a first argument listener's handler method will receive a callback function originally called by hadron, so you can change/override it however you want and then return a call of newly created function or a call of existing callback if you dont want to change it.

To be able to receive callback mentioned above, first argument should be named exacly 'callback', otherwise you will not recive the callback.

You can also, define your listener's handler without callback argument or even without any arguments , which is also a valid way to create listeners, you just won't be able to access the callback. 

The second argument of listeners handler method is ...args, which can be used as arguments for callback function.

An example of a listener:  
```javascript
  {
      name: 'Listener',
      event: 'createRoutesEvent',
      handler: (callback, ...args) => {
        const myCustomCallback = () => {
          console.log('Hey! I\'ve changed the original hadron function!!!');
          return callback(...args);
        }
      return myCustomCallback();
      }
  }
```
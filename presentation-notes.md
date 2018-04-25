# Self documenting js w/ regent presentation

Ivan Eisenberg, Js dev @ northwestern mutual, local string musician (banjo)

## Narrative

Lets imagine we're writing a new js app, we're buildling an application to help determine our dress for the given weather

we have:

* temp
* precipitation chance

if statements with nested logical expressions make it hard to remember the "rules" for our decision making ...
we can find them but they require surfing the code -> time a dev has to spend

we can abstract the rules to clean it up, but it still hides the problem of hiding the rules from us

regent offers a simpler way of presenting the "business rules" without sacrificing cleanliness or requiring domain knowledge

## Install

```bash
npm install regent
```

how? develop clear rules that are easily locatable and programmatic

why? solve some of the above problems of the narrative, documenting business logic for new team members or non-programmers. Helps identify "bugs" from bugs 

##Regent Rules

The core of regent is rules:

```javascript
const coldEnoughForCoat = {
    left: '@weather.temp'
    fn: 'lessThan'
    right: 50
}
```

Evaluates to true if the temp is less than 50 degrees: clear, concise, documented

Thresholds are customizable, users can have control in the flow of control here

### Combined rules

```javascript
const isSnowing = regent.and(belowFreezing, highPrecipitation)
```

This proves us the "why?", but what about the "how?"

### Using rules

```javascript
const data = {
    weather: {
        temp: 30,
        precip: 75
    }
}

regent.evaluate(isSnowing, data);
```

That's it! Its hardly better than the old way (nested if logic) but the rules provide documentation that is valuable and not provided in our old solutions

```javascript
regent.explain(isSnowing, data);
```

This even offers us a "pretty print" version of why the rule evaluated the way it did. Run-time documentation!



## Logic Tables

Nothing more than an array of object literals, where each entry has a regent rule as a key

```javascript
const coatWeatherLogic = [ 
      { 
       	value: "wear a coat!" 
     	rule: coatWeather 
      },
      { value: "dont wear a coat"
	    rule: regent.not(coatWeather) 
      }

regent.find(coatWeatherLogic, data)
```

Will evaluate all of the rules in the table and return the first result that passes our rules, flow of control!



## A Case Study

There is some image in a UI, and under a certain scenario the user should see a new image instead of the original but even after those steps the image wasn't updating...

1. The tester (find the bug, fix the bug) heads over to this widget-image logic js to see the source. Nothing was relating to the "new" image whatsoever! It was never implemented
2. Tester heads to rules .js to see if they can find the source, the new image code was initialized but the rules showed that a flag wasnt being set to true when needed.
3. The tester can add just a single line (a new action in a logic table) to implement the action as a result of a true evaluation of the rule

The issue when using regent boils down to its either configured correctly, or its the other one. Little to be confused when implemented well. Saves countless hours in debugging.



## Other Notes

Doesn't have XOR as a prebuilt predicate

NM is working on some CLI implementation of regent that's near production

works well with redux stores, because the shape is predictable and schema is constant

Define each piece as tiny as you possibly can 

* more documentation of the logic regardless of added value
* more modular rules for potential future use, composition with other rules, etc...

Functionally pure! 




Before we begin   
_Final project ideas?_

#### Week 3 follow up
* excluding `bundle.js` from source control
* `key` property when return a list of components + concrete example
* problems with current approach

### Week 4 - Flux
Video: --inser url here--

#### Assignment 5

Now we should look at how to handle data in a better way then injecting and propagating props though components. We will start using flux which is a small framework that ensures a unidirectional dataflow within your app. The term "flux" is really more the naming to a design pattern than a framework and should not be considered a part of React.
We will continue to work on the code from last week.

* `npm install flux --save-dev`
* Create a `list-store.js` and a `message-store.js`, that will contain data for lists and messages, respectively.
* Create actioncreators for handling messages and lists, `list-actions.js` and `messages-actions.js`
* The naming of these files are not mandatory, but its good practice to at least group files together by domain areas. 
* We are gonna walk through the basics of creating stores and actions together.
* From now on, no views/components must contain any validation code.
* The unidirectional dataflow must be honored:
  * Never write to stores!
  * Every mutation must be initiated from an action
* All non-view state should be persisted in and fetched from a store.
* Implement all the actions needed for the app to work as is.
* Implement the stores to return their respective part of the data.
* When you are happy with your changes, create a pull-request
* As part of this asignment, you will have to review one of your peer's code and provide proper feedback.
* You will be paired before code-review
* All review comments/feedback should be reported using GitHub 


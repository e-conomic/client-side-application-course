
Some notes on decisions taken, there might be better alternative, would be happy to learn:

- Using key as an id, since that makes access easy. Easier than storing messages and lists as arrays and looping to find.
- Id created with Date.now(), ok for small application with not a lot of concurrency.
- Iterating over keys in the object with e.g. Object.keys(lists).map(function, listKey, i){}
- Generates a dynamic ref to get value from several drop down menues
- Using JSON.parse(JSON.stringify(o)) to copy state before changing it. splice() would be the equivalent with arrays.
- Almost all update of state is in the App component. The child components have very little state at all. Functions to
update state is passed down.


- users should be able to create an unlimited number of named lists CHECK
- users should (only) be able to add valid messages to any given list CHECK
- messages can contain any characters, but must not be longer than 200 characters CHECK
- messages with more than 200 charactes cannot be added to any list CHECK  
- a message can only belong to one list at the same time CHECK
- all existing lists should always be visible and show their messages CHECK
- users should be able to move existing messages between lists CHECK
- users should be able to delete a message CHECK
- users should be able to archive a message CHECK
- archived messages should be visually distinct from other messages CHECK
- archived messages should be shown in the bottom of a list, being clearly separated from other messages.
- archived messages cannot be deleted or moved CHECK
- lists can contain both types of messages (archived and normal) CHECK
- users should be able to "unarchive" messages. Once "unarchived", messages return to their inital state as normal
messages. CHECK
- this assignment must be solved using only native javascript and react, and without using any 3rd party react
components or libraries
- this assignment must be solved without using bundlers

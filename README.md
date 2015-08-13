# tigra-teaser

Tigra Teaser is a simple game that runs in the browser. It's designed to help get people in Oakland excited about working with TIGRA, a grassroots community organization, to build Economic Citizenship.[Here's a link to a dev version we piloted at the Indie Awards] (https://tigra-teaser.herokuapp.com/).

What's it made of?
  - teaser.js is a module encoding the logic of this game: three multiple choice questions, scoring, Economic Citizenship 'levels,' and contextual information to give meaning to the scores.
  - main.js uses **Backbone.js** to render the Teaser.js logic in interactive Views. 
  - jst.js has **Underscore.js** templates used by main.js
  - index.html loads the necessary js remotely and sets up a container for main.js to work with
  - main.css has some CSS, partially relying on **Bootstrap**
- there's just enough server-side to get it launched using **node.js** and **Express**. 

How can I try it?
It's a heroku node.js app, so you can follow [Heroku's instructions for getting started on a Node.js app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) except you'd use this repo instead of the example one in the instructions. The package.json file and Heroku will let you know you need Node, Express, npm, and node-sass installed. 


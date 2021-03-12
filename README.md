## Productoro
Description

## Purpose
Desciption

## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## Build status
Build status of continus integration i.e. travis, appveyor etc.

## Repository Organization
All Javascript, CSS and Jest files are located in the [source directory](./source).

<pre>
+-- source/  
|         +-- timer.js  
|         +-- breakReminder.js
|         +-- help.js
|         +-- notifications.js
|         +-- progress-bar.js
|         +-- color-change.js
|         +-- productoro.html
|         +-- styles.css
|         +-- __tests__/
|                      +-- timer.test.js
|                      +-- help.test.js
|                      +-- notifications.test.js
|                      +-- notifications.showNotif.test.js
|                      +-- progressBar.test.js
|                      +-- colorChange.test.js
|         +-- img/
|                +-- DT2 (Final).png
|                +-- Settings_icon.png
|                +-- tomato.png
</pre>

All Cypress tests can be found at [<code>./cypress/integration/Productoro-Tests/UI-test.js</code>](./cypress/integration/Productoro-Tests/UI-test.js).

## Tech/framework used
Productoro is developed using Javascript, HTML, and CSS. Babel-Jest and Cypress frameworks are used for testing.

## Pre-Development Procedures
<code>explain process for user stories, brainstorm, system diagrams, interface, pitch??</code>

## Sprint Procedures
<code>Explain sprint planning??</code>

At the beginning of each sprint a sprint-specific branch (i.e. sprint3) and feature-specific branches (i.e. customTimeLimits) should be created. Throughout the sprint, all team members should work on the feature-specific branch corresponding to their assigned issue. Throughout the sprint, multiple pull requests should be made from the feature-specific branches to the sprint-specific branch. The final pull request from a feature-specific branch to a sprint-specific branch should close the issue(s) related to the feature.

At the end of each sprint, a pull request should be made from the sprint-specific branch to the master branch.

The primary team leader is responsible for reviewing all pull requests, resolving merge conflicts (or delegating resolution to other team members), and approving the pull requests.

ADRs should be updated as the team decides on design changes. Each change should be well-documented in an ADR markdown document titled located in [<code>./specs/adr</code>](./specs/adr).

## Installation
1. Clone the cse110-w21-group35
 repository onto your local machine using <pre>git clone `https://github.com/nidhigiridhar/cse110-w21-group35.git`</pre>

## Code style
The Dream Team uses a standard coding style, and a guide to Dream Team specific styling standards can be found [here](./source/style-guide.md).

## Documentation
All Javascript files should be well documented using [JSDoc](https://jsdoc.app/) standards.

Using GitHub Actions, all documentation should be generated and updated each time a sprint specific branch is merged with the master branch. The documentation for Productoro is hosted on [this repository](https://github.com/sywong888/cse110-w21-group35-docs/tree/gh-pages) (on the gh-pages branch) and deployed to [this page](https://sywong888.github.io/cse110-w21-group35-docs/).

## Tests
babel test description
<pre>npm install --save-dev babel-jest  
npm install @babel/preset-env --save-dev
</pre>

cypress test description
<pre>./node_modules/.bin/cypress open
</pre>

lighthouse?

## Deployment
<code>recommend using Netlify? GitHub pages</code>

## Credits
Productoro was created for UCSD's CSE 110 Software Engineering course taught by Professor Powell. Members of the Dream Team include Samuel Burkholder, Zachary Chan, Jasmine Chen, Nidhi Giridhar, Alejandro Malanche, Alejandro Marquez, Ian Rebmann, and Sydney Wong. The Dream Team was mentored by TA Chad Hayen.
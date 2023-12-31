# Table of Contents
- [Description](#description)
- [Submission](#submission)
- [Background](#background)
- [Getting Started](#getting-started)
  - [Basic Setup](#basic-setup)
  - [Key tools and concepts](#key-tools-and-concepts)
  - [Interfacing with Noyo's APIs](#interfacing-with-noyos-apis)
- [Your Tasks](#your-tasks)
- [What we're evaluating](#what-were-evaluating)
- [What we're not evaluating](#what-were-not-evaluating)
- [Thanks](#thanks)

## Description
This is the front-end component to our full-stack coding challenge. The main instructions are in this readme, but the back-end can be found in [this repository](https://github.com/noyo-technologies/fullstack-coding-challenge-api)

For the take-home portion of this exercise, you can refer to the [tasks below](#your-tasks). 

**There will also be a live coding session which _will include updating both_ the back-end and front-end apps. The goal of the that session will not be a race against the clock, but you can view it as a collaboration session as if you were pairing with another engineer at Noyo.**

## Submission

Zip up your code and email it to coding-challenge at noyo dot com no later than 24 hrs before your interview 😄

The take-home portion should only require updates in this repository.

## Background

One of our biggest challenges at Noyo is understanding how our data changes over time and why. This allows us to understand the state of our system when a given transaction was executed, and to inspect how and why the data changed since the request was made. It allows us to answer important questions such as:

* What was the exact address on file for an employee when a transaction was performed X days ago?
* What exactly was changed about the mailing address of this employee when the last update occurred?


## Getting Started

### Basic setup
 After you clone this repo, you'll need to run `npm install` (once), and then run
`npm start`. 

This repo was generated with [create-react-app](https://github.com/facebook/create-react-app) and thus uses [webpack-dev-server](https://github.com/webpack/webpack-dev-server).
When you run `npm start`, webpack-dev-server will open a new browser tab or window with the running app.
Changes you make will be compiled automatically, and you should see the page refresh.

### Key tools and concepts

Our app uses [Redux](https://redux.js.org/) and [Redux Thunk](https://github.com/reduxjs/redux-thunk). Here's a [good explanation of thunks](https://daveceddia.com/what-is-a-thunk/).

*We recognize that it may take some time to familiarize yourself with these tools*

### Interfacing with Noyo's APIs

The application uses a backend service that you can find [available here](https://github.com/noyo-technologies/fullstack-coding-challenge-api). You'll have to follow the instructions here to get it running on your own computer and seed the data, but you'll find that all the API queries have already been supplied for you in the JavaScript code. 

## Your tasks
### 1. Familiarize yourself with this repo and the [backend repo](https://github.com/noyo-technologies/fullstack-coding-challenge-api)

### 2. Find and fix a bug in our application
When you start the application, you should see text that says **"Choose a user ID from the dropdown above."**

But you won't see anything in the UI that allows you to select a user ID. What gives?

If you dig into the code, you'll see that we didn't forget to implement this; there's a component called `UserSelectForm` in `src/components.jsx` (on line 29).

So why isn't this displaying when you load the app? Your first task is to diagnose and fix the issue displaying our user select component. Please be prepared to discuss your debugging process during the interview process.


### 3. Add retry logic for cases when the API connection is lost.

Try the following scenario:

1. With the app running, shut down the API server.
2. Try to select a different user ID in the users dropdown.
3. You should see an error message reading "Something went wrong while fetching addresses."
4. Restart the server.
5. Once it's running, try to select a user ID again.
6. You should see the error message go away and the app return to normal function.

So far, so good. Now try this scenario:

1. Shut down the API server.
2. Refresh the app in your browser.
3. You should see an error message reading "Something went wrong while fetching users."
4. Restart the server.
5. The only way you can get the app back to working order is to refresh the page. We want to fix this.

We work really hard to make sure our apps and our APIs have excellent uptime, but cloud platforms like GCS and AWS have occasional outages. Usually these are brief.

As such, we want this app to try to recover if it starts up and fails to connect to the API server. What we'd like you to do is implement some retry logic with the following requirements:

* If the API request to fetch user IDs (`index.js`, line 19) fails with an error in the 500 range or the fetch request fails altogether, our app should retry this request.
* It should retry up to 4 times (5 requests in total).
* There should be 10 seconds between each retry.
* If any of the retry attempts succeeds, we should not retry again. The app should function normally at this point.
* If the status code of any request is in the 400 range, we should treat this as success for the purposes of our retry logic, but we should still show an error message.
* The retry logic should only apply to fetching user IDs, not addreses or events.

### What we're evaluating
* Whenever you start a new job, you encounter code other people wrote, and you'll have to understand the architecture and write code to match it.
* Does your code do what it's supposed to do without obvious errors or bugs?
* Can you debug a problem in some unfamiliar code? How did you go about debugging?

### What we're not evaluating
* *Your design skills.* Our designers welcome your feedback, but we don't expect our devs to also be designers.
* *Your ability to bootstrap a new application.* Hopefully you don't have to do this many times at Noyo, which is why we've provided a running application.
* *Building things from scratch* with no code to work from.
* *Automated testing*: We believe this is an important part of development work, but are not expecting it for this assignment, unless you find yourself with extra time. 

## Thanks!
We make every effort to demonstrate that we see your time as valuable, and we will make every attempt throughout the interview process not to waste it. Nonetheless, we know you're making a big time commitment and we're sincerely appreciative of both your time and your interest in working at Noyo.
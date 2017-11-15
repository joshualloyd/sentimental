# Sentimental

This app allows users to take text documents, save them, and analyse them using the IBM Watson Natural Language Understanding service, and then present visualizations based the on the data returned from analysis.

## Overview

So you think you understand writing...

Let's face it, sometimes it can be hard to understand the bigger picture while keeping the smaller parts of a piece of writing together. We think we know what we're writing, we think we know what others are writing, but often times we don't. We also find ourself amazed, confused and outraged by what others write. So I made Sentimental to help me out.

I can copy/paste text into the input field and run different types of analysis to determine: sentiment, emotion, and entities. You can put in anything into the input. Have a large essay you'd like to understand better, paste it in. A news article has weird bias,paste it in. Want to understand common themes in multiple pieces of writting from someone else, paste it in.

You might be surprised by what you find.

## Requirements

1. Node.js/NPM (LTS or later)
2. PostgreSQL

## Setup

1. Clone this repository
2. Sign up for IBM Bluemix account and setup the credentials for the IBM Watson Natural Launguage Understanding service
3. Setup your .env and ./config/config.json files
4. Setup your postgreSQL database according to your config.json
5. Run npm install, then npm run db:build, then npm start

## Structure

After setup you can create a user. With that user you can begin to create documents. Once you have a document your can create different anyalyses and view the results.
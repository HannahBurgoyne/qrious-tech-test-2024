# qrious-tech-test-2024

This tech test uses the PokeAPI to render a Pokedex. All 151 pokemon from the first generation are rendered. 

## How to run this project 
```
git clone
npm i
npm run dev
// project runs in browser on localhost:5173
```

## How to run the tests 
```
npm run test // to just run the tests 
npm run test -- --coverage // to run all tests with a coverage report included
```

## Features
A user can: 

- View a list of all pokemon
- Click on a pokemon to see more details about it
- Filter all pokemon by type
- Search for a pokemon by name or number

## Testing 
Frontend integration testing was completed using vitest and the vitest/v8-coverage library. A range of scenarios have been tested for including happy and unhappy paths.

## Accessibility 
This app has been tested using the WAVE browser extension. All alerts and errors flagged by this tool have been fixed. Keyboard navigation has been manually tested. 

## API data fetching and caching 
The API fetching and state is managed by Tanstack ReactQuery and superagent. ReactQuery caches the data returned by the API so that it can be used again in other components. This improves overall performance and helps to limit the number of calls made to the API. 

## Key challenges I faced 
- Getting back the specific data needed from the API, but ensuring only the original 151 pokemon were retrieved. I ended up making two calls to the PokeAPI in my api function, first getting all pokemon by the first generation and then each pokemon's respective details.
- Dynamically changing the background colour of a pokemon's type using Tailwind CSS. Tailwind builds before any programming logic can be compiled, meaning that string interpolation for dynamic variables did not run and render the background colour. To fix this, I needed to create a `colorMap` of key-value pairs in my `Icon` component to search for the correct colour and apply it to the background.
- Testing my API call using nock. I ended up needing to mock multiple API calls in each of my tests using nock, to simulate the actual logic in my real API function where multiple requests are made to different API endpoints. 

## What I learnt
- How to implement a search bar which auto-refreshes the state of the data as a user types in their input
- Dynamically changing the background colour in the `Icon` component based on the pokemon's type(s)
- Testing user events for searching and filtering the `PokemonList` component

## FlashCard
This is a react native application that can run on both IOS and Android. <br/>
The app essentially provide a question-collect api that allows user to create a "deck" (question list) composed of "card" (question). <br/>
The app will automatically generate a quiz that asks questions created by user, which can help user revise these questions.

### Functionality
- Add/Remove deck
- Add/Remove a single card
- start a quiz
- notification

### Folder structure
```
- actions
  index.js
- components
  AddCard.js
  DeckDetail.js
  DeckList.js
  NewDeck.js
  Quiz.js
  TextButton.js
- reducers
  index.js
- utility
  _flashcard.js
  api.js
  color.js
  utility.js
App.js
.gitignore
app.json
package-lock.json
package.json
README.md
yarn.lock
```

### Install and Launch
1. Install dependency: Run `yarn install`  int root folder.  </br>
2. run `yarn start` and choose to test on either Android or IOS

### P.S.
- The Android version is tested on Android Studio with a virtual device

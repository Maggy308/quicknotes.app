# QuickNotes

QuickNotes is a lightweight notes app built with plain HTML, CSS, and JavaScript. Use it to capture short thoughts and organize them into Personal, Work, or Study categories. Notes are saved in your browser, so they remain available after you refresh the page on the same browser and device.

## Features

- Create notes with a category: Personal, Work, or Study.
- Validate empty notes and keep each note within 200 characters.
- Search notes by text with case-insensitive matching.
- Delete individual notes or clear the whole collection after confirmation.
- Automatically save and restore notes with `localStorage`.
- Display each note's category, creation date, and an accurate total count.
- Responsive layout for desktop and mobile screens.
- Keyboard shortcut: press **Ctrl + K** (or **⌘ + K** on Mac) to focus the search box.

## Run the project

1. Open the repository on GitHub and select **Code → Download ZIP**, then extract the files, or clone the repository:
   ```bash
   git clone https://github.com/Maggy308/quicknotes.app.git
   ```
2. Open the project folder.
3. Open `index.html` in a modern web browser.

No package installation, build step, or server is required. Notes are stored locally in the browser that you use to open the app.

## What I learned

- How to structure a small web app with semantic HTML and accessible form labels.
- How to use CSS Grid, Flexbox, and media queries to create a responsive interface.
- How to handle form events, validate user input, and update the DOM with JavaScript.
- How to use arrays and objects to manage note data and filter search results.
- How to persist data with `localStorage` and safely render user-entered text with `textContent`.

## Project files

- `index.html` — page structure and form controls.
- `style.css` — layout, colors, note cards, and responsive styling.
- `script.js` — note creation, validation, search, deletion, and browser storage.

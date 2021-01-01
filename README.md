## How to Load the App

The project uses Node.js and the Create-React-App starter. You can download the current version of node here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app

```
git clone https://github.com/oppongbaah/reactnd-myreads-app.git
```
Navigate to the root directory of the project and install dependencies using
```
npm install
```

Once all of the dependencies have been installed you can launch the app with

```
npm run start
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

## How to Use the App

- Books are sorted into three categories: Currently Reading, Want to Read and Read
- To change a book's category or remove a book from the list, click on the green button on the book cover


- To add new books, click on the green + button at the bottom of the page.
  Enter an author's name or subject. Up to 20 items will be returned.

_Note: The backend API is limited to a fixed set of [search terms](#search-terms) -- see the SEARCH_TERMS.md for valid search options_

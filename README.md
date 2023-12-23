<<<<<<< HEAD
# mini-page-builder
Page builder which lets the user drag and drop components from the sidebar.
=======
## Stack used
### React + Vite

## About Mini-Page-Builder
- It is a single page react application in which initially there is a sidebar and blank page.
- In sidebar there are three components(label, input, button) and a export button.
- User can drag those component into the blank page.
- On dropping component to the page it will open a modal to configure the component properties.
- Properties like its title, position, font size and font weight.
- After completing the configuration user can click on save.
- On clicking save the component will appear on the page.
- User can also drag the component inside the page.
- Components are selectable user and select component and can hit enter or delete.
- On hitting enter it will open the component configuration modal to make any change.
- On hitting delete it will delete the selected component.
- All the page data will automatically get saved into local storage.
- User cna export the page data by hitting export button on the bottom of sidebar.

## How to run the code?
1. Copy the repository link from github.
2. Initialise git into your directory where you want the project file to be pulled.
  `git init`
3. Add remote origin
  `git remote add origin <repo link>`.
4. Checkout to master branch
  `git checkout master`
5. Pull master
  `git pull origin master`
6. Install all the required dependencies
  `npm install`
7. Run the project
  `npm run dev`

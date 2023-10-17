![](/src/images/logo/addonhub-high-resolution-logo-black-on-white-background.png)
# [AddonHub: Elevate your software development experience](https://addonhub-hosting-dev.web.app/)

## About the app

AddonHub is an Addons Registry web application, inspired in part by [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode), [JetBrains Registry](https://plugins.jetbrains.com/), and [Eclipse Marketplace](https://marketplace.eclipse.org/). The functionality available to its users includes: 
•	Publishing own addons; 
•	Browse addons for a preferred IDE;
•	Download (or purchase) addons;
•	Rate existing addons.

### Authors: **Bug Busters**
- #### [Ilia Popov](https://gitlab.com/ipp02)
- #### [Slavena Koleva](https://gitlab.com/Slavena-Koleva)
- #### [Valentin Petkov](https://gitlab.com/valentin.p.petkov.a49)

Telerik Academy Alpha #49 JS, 2023

## Starting the app 

The production build is accessible at: [AddonHub](https://addonhub-hosting-dev.web.app/).

Alternatively, a local development build can be run after cloning the repo first:

```
mkdir addonhub-clone
cd addonhub-clone
git clone https://gitlab.com/web-project-1-group-4/addonis.git
```

Then, install all dependencies:

```
npm install
```

And finally run the local dev server:

```
npm run dev
```

A new tab should open in your default browser. Alternately, you can copy/paste the following url to the address bar `[localhost:3000](http://localhost:5173/)`.

## Tech stack

The project is implemented using JavaScript and React.

Some of the technologies used are:

- Firebase - handles backend functionality for Authentication, Database and File Storage;
- React Router Dom - a lightweight, fully-featured routing library for the React JavaScript library;
- React Helmet - a reusable React component that manages changes to the document head; helpful in addressing the SEO challenges of SPAs;
- React-Paypal-JS - abstract away the complexity around loading the JS SDK with the global PayPalScriptProvider component; helpful in integrating payments with PayPal;
- React-Toastify - allows for easy addition of notifications;
- Tailwind CSS - a utility-first CSS framework that can be composed to build any design, directly into the markup;
- Flowbite React - an open-source UI component library built on top of Tailwind CSS with React components and based on the Flowbite Design System;
- GitHub REST API - create integrations, retrieve data, and automate workflows; useful in retrieving additional information for the addons uploaded to the site.


## Database schema

The schema of the Firebase database used in the backend of the application is presented below:

```
firebase realtime database
|
├─ users
|  ├─ user
|     ├─ addons
|     |  ├─ addonID: {bool}
|     ├─ bio: {string}
|     ├─ bought addons
|     |  ├─ addonID: {bool}
|     ├─ company: {string}
|     ├─ downloads
|     |  ├─ addonID: {bool}
|     ├─ email: {string}
|     ├─ firstName: {string}
|     ├─ github: {string}
|     ├─ joinedOn: {date}
|     ├─ lastLoggedIn: {date}
|     ├─ lastName: {string}
|     ├─ linkedin: {string}
|     ├─ notifications
|     |  ├─ notification
|     |  |  ├─ author: {string}
|     |  |  ├─ content: {string}
|     |  |  ├─ createdOn: Date in UNIX format
|     ├─ occupation: {string}
|     ├─ phone: {string}
|     ├─ photoUrl: {string}
|     ├─ region: {string}
|     ├─ reviews
|     |  ├─ review
|     |  |  ├─ author: {string}
|     |  |  ├─ content: {string}
|     |  |  ├─ createdOn: {date}
|     |  |  ├─ rating: 0, 1, 2, 3, 4, or 5
|     ├─ role: 'user' or 'admin'
|     ├─ uid: {string}
|     ├─ username: {string}
├─ addons
|  ├─ addonID
|     ├─ addedOn: date in UNIX format
|     ├─ author: {string}
|     ├─ description: {string}
|     ├─ downloadedBy
|     |  ├─ username: {bool}
|     ├─ gitHubLink: {string}
|     ├─ license: {string}
|     ├─ logo: {string}
|     ├─ name: {string}
|     ├─ price: {string}
|     ├─ reviews
|     |  ├─ user
|     |  |  ├─ author: {string}
|     |  |  ├─ content: {string}
|     |  |  ├─ createdOn: {date}
|     |  |  ├─ rating: 0, 1, 2, 3, 4, or 5
|     ├─ state: 'pending', 'approved', 'featured', or 'disabled'
|     ├─ tags
|     |  ├─ tag: {string}
|     ├─ targetIDE: 'IntelliJ IDEA', 'PyCharm', or 'VS Code'
|
├─ tags
|  ├─ name: {bool}
```

We also utilize the Firebase storage to store assets such as users' profile pictures and logos for the uploaded addons.


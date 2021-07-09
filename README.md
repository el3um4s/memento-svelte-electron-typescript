# MEMENTO Svelte Electron Typescript

Template for create a desktop app with Svelte, Electron and TypeScript (with electron-updater, electron-reload and electron-builder)


# Get Started

This is a project template for [Svelte](https://svelte.dev) and [Electron](https://www.electronjs.org/) apps. It lives at https://github.com/el3um4s/memento-svelte-electron-typescript.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit el3um4s/memento-svelte-electron-typescript
cd svelte-app
```

Then install the dependencies with

```bash
npm install
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Command

For development purpose:

- `npm run nodemon`: auto restart Electron on change
- `npm run dev`: auto reload the web page when you change Svelte files

For publish purpose:

- `npm run out:win`: create an exe file for Windows
- `npm run publish:win`: publish the app on GitHub

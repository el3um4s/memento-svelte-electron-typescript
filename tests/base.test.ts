// https://playwright.dev/docs/intro
// https://playwright.dev/docs/api/class-electron/
// https://playwright.dev/docs/api/class-electronapplication/
// https://playwright.dev/docs/api/class-page/
// https://github.com/cawa-93/vite-electron-builder/blob/7d2df55fd8a0b3a803963d62558f719c9034ba2a/tests/app.spec.js
// https://github.com/microsoft/playwright/tree/master/tests/electron
// https://github.com/spaceagetv/electron-playwright-example

import { ElectronApplication, Page, _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';
import semver from 'semver';

test('Launch electron app', async() => {
    const electronApp = await electron.launch({ args: ["."] });

    const windowState: { isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean; }  = await electronApp.evaluate(async ({ BrowserWindow }) => {
        const mainWindow = BrowserWindow.getAllWindows()[0];

        const getState = () => ({
            isVisible: mainWindow.isVisible(),
            isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
            isCrashed: mainWindow.webContents.isCrashed(),
        });

        return new Promise((resolve) => {
            if (mainWindow.isVisible()) {
                resolve(getState());
            } else {
                mainWindow.once('ready-to-show', () => setTimeout(() => resolve(getState()), 0));
            }
        });
  });

  expect(windowState.isVisible).toBeTruthy();
  expect(windowState.isDevToolsOpened).toBeFalsy();
  expect(windowState.isCrashed).toBeFalsy();

  await electronApp.close();
});

test.describe('Check Man Page', async () => {
    let electronApp: ElectronApplication;
    let firstWindow: Page;
    let context;

    test.beforeAll( async () => {
        electronApp = await electron.launch({ args: ["."] });
        context = electronApp.context();
        await context.tracing.start({ screenshots: true, snapshots: true });
        firstWindow = await electronApp.firstWindow();
        
        await firstWindow.screenshot({ path: 'tests/screenshot/firstWindow.png' });
    })

    test('Check title', async () => {
        const title = await firstWindow.title();
        expect(title).toBe("MEMENTO - Svelte, TailwindCSS, Electron and TypeScript");
    });

    test('Check version number: APP', async () => {
        const versionNumberApp = await firstWindow.innerText('data-testid=version-number-app');
        expect(versionNumberApp).not.toBe('-');
        const isValidNumberApp = semver.valid(semver.coerce(versionNumberApp))
        expect(semver.valid(isValidNumberApp)).not.toBeNull();
    });

    test('Check version number: NODEJS', async () => {
        const versionNumberNodeJS = await firstWindow.innerText('data-testid=version-number-nodejs');
        expect(versionNumberNodeJS).not.toBe('-');
        const isValidNodeJS = semver.valid(semver.coerce(versionNumberNodeJS))
        expect(semver.valid(isValidNodeJS)).not.toBeNull();
    });

    test('Check version number: CHROME', async () => {
        const versionNumberChrome = await firstWindow.innerText('data-testid=version-number-chrome');
        expect(versionNumberChrome).not.toBe('-');
        const isValidChrome = semver.valid(semver.coerce(versionNumberChrome))
        expect(semver.valid(isValidChrome)).not.toBeNull();
    });

    test('Check version number: ELECTRON', async () => {
        const versionNumberElectron = await firstWindow.innerText('data-testid=version-number-electron');
        expect(versionNumberElectron).not.toBe('-');
        const isValidElectron = semver.valid(semver.coerce(versionNumberElectron))
        expect(semver.valid(isValidElectron)).not.toBeNull();
    });

    test.afterAll( async () => {
        await context.tracing.stop({ path: 'tests/tracing/trace.zip' });
        await electronApp.close();
    })
})

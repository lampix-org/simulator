## 2.5.2
##### *Dec 17, 2019*

Highlights:

- provide dummy `package_data` (package.json info) and `is_local` property to `getApps()` method of lampixjs API   

## 2.5.1
##### *Dec 17, 2019*

Highlights:

- [UI] Watcher name now shows neural network name where applicable

## 2.5.0
##### *Dec 4, 2019*

Highlights:

- `cmd/ctrl + q` to close focused window
- `cmd/ctrl + shift + i` to open simulation devtools
- updated to **electron@3.0.10** (Chromium v66 and upstream bug fixes)

Captain's log:

- `cmd/ctrl + shift + i` only works when the simulation itself is focused, not the host window (which can be focused by clicking on the title bar)

## 2.4.0
##### *Nov 29, 2018*

Highlights:

- custom title bar for both the simulator and simulations

## 2.3.2
##### *Nov 27, 2018*

Highlights:

- enabled cached busting for `http(s)`, `file` and `simulator` protocols

## 2.3.0
##### *Nov 14, 2018*

Highlights:

- standard request / response for all actions triggered by lampixjs
- **lampixjs versions <= v1.0.0-beta.0 are no longer supported** as a consequence of the above - only change necessary is updating to `beta` from `alpha` via `npm i @lampix/core@next`
- responses are properly matched with their requests for all calls (previously only true for watcher management functions)
- compatible with Lampix 2.1.x

## 2.1.7
##### *Nov 3, 2018*

Highlights:

- added download links in README.md

## 2.1.6
##### *Nov 2, 2018*

Captain's log:

- fixed request for `config.json` under HTTP and HTTPs protocols

## 2.1.5
##### *Nov 1, 2018*

Captain's log:

- replaced `request` with `got` due to seemingly unresolved issue with callback sometimes not being called (at all)
- use `10.13.0` as Node version in Travis CI
- updated infrastructure to Webpack 4
- removed `dotenv` as a dependency

## 2.1.2
###### *Oct 31, 2018*

Captain's log:

- fixed cache.directories indentation in .travis.yml


## 2.1.1
###### *Oct 30, 2018*

Highlights:

- **Supports only @lampix/core v1.0.0-alpha.20+**
- Provides a simple HTTP server to serve apps placed in the 
  _[userData](https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname)/webapps_. To access an app placed there, use `simulator://<folder-name>`, e.g `simulator://trivia`. The _webapps_ folder can be found at:
    - _%APPDATA%/lampix-simulator_ on Windows
    - _$XDG_CONFIG_HOME/lampix-simulator_ or _~/.config/lampix-simulator_ on Linux
    - _~/Library/Application Support/lampix-simulator_ on macOS
- Registered areas are no longer visible, but will be introduced again at a later time
- Supports `getAppConfig()`, resolving the _config.json_ file differently based on how the app is loaded (see captain's log for details)
- A changelog was born

Captain's log:

- simulated apps no longer use `BrowserWindow` directly, instead using `BrowserView` as a child frame of a `BrowserWindow` instance. This allows the development of context based notifications, such as informing the user of errors encountered in the main process. It also sets the stage for an overlay to show registered areas, placed objects and to allow their removal while this overlay is active.
- `getAppConfig()` resolves _config.json_ based on the protocol used to load the application, but always searches for it next to _index.html_
    - `file:` uses the path provided in the URL
    - `http(s):` uses `${url.origin}/config.json` 
    (e.g `http://localhost:8080/config.json`) - this isn't immensely flexible, so please raise an issue if it's not enough for your use case
    - `simulator:` uses the internal HTTP server to resolve the file in the directory for the specified app name
- `simulator:` scheme does not cache, it always reads from disk

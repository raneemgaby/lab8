## How to install and run the project
first the reposiry needs to get cloned:git clone <repository-url>
then change the current directory to the project's directory:cd lab8
then we install the dependency list:npm ci
then we write:npm run dev to run the server automatically in case of anychanges.

## File Organization
first i implemented the server.js which allow to route through the porject file including the request and response formats,then implemented the index.html to add the content of the page,then customized it through the styles.css file,eventually applied the app.js to add an event handler to each url button in the server.

## Output of curl --include:
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 127
ETag: W/"7f-vgyjujhS+U014fcYOE65UP6aRNc"
Date: Sun, 15 Nov 2026 07:31:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

[{"id":1,"title":"web prog","credits":6},{"id":2,"title":"interface-designing","credits":3},{"id":3,"title":"OOP","credits":5}]HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 19
ETag: W/"13-oWAPIqDXuocNexKhPYW9ayyk98c"
Date: Sun, 15 Nov 2026 07:31:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"subscribed":true}HTTP/1.1 403 Forbidden
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Sun, 15 Nov 2026 07:31:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}HTTP/1.1 302 Found
X-Powered-By: Express
Location: /hello
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 28
Date: Sun, 15 Nov 2026 07:31:33 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Found. Redirecting to /helloHTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-bm7tJgu8FHlq5QU+Y6gDxOGPfRc"
Date: Sun, 15 Nov 2026 07:31:33 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Not found"}HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 14
ETag: W/"e-vDAjs2Bjp2gdskaBRytU+hHw1Ow"
Date: Sun, 15 Nov 2026 07:31:33 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Page not found

## Reasonong Questions:
1. When I moved the 404 fallback before the routes, requests matched it first and received a 404 response. Because the fallback sends a response without calling `next()`, the real route handlers were not reached.
2. the logger handler didn't pass the request to the next handler,though it printed the timestamp,url and method,so the logger didn't even sent a response or passed the request to the handler,hence the handler never ran.
3. beacuse 201 is to create,so here it created a subsription,rather than just having it as 200 which means ok.beacuse a 404 means not found which is reasonable to use when a page didn't find,whhile 200 means ok,which makes no sense to use it when a page is missing.
4. because a computer can run multiple servers on different ports,reading process.env.PORT lets the enviroment choose an available port and avoids hard-coding one.
5. node_modules/ is not committed because it contains downloaded dependencies, can be large, and can be recreated. The project lists its dependencies in package.json and records their exact versions in package-lock.json. After cloning the repository, a teammate should run npm ci to install the dependencies, then npm run dev to start the server.
6.  Opening an API page with relative URL directly from my computer can still display the page,but the page isn’t being served by Express, so its relative API requests won’t go to  server at localhost:3000. The browser’s relevant security rule is the same-origin policy; CORS is how cross-origin access can be allowed.

## Self-Study
### Request timestamps
The request logger uses `new Date().toISOString()` to create a timestamp for the current date and time in ISO 8601 format. It includes that timestamp with the request method and URL in the server log.

### Process information
`process.version` returns the version of Node.js currently running the server. This value depends on the installed Node.js version and is read at runtime rather than hard-coded. `process.uptime()` returns how many seconds the server process has been running.

### Static files and paths
`path.join()` builds the path to the `public` folder, and
`fileURLToPath(import.meta.url)` with `path.dirname()` makes that path relative
to `server.js`, rather than the folder from which I start the server.
`express.static()` serves files in `public`, such as `styles.css` and `app.js`.
Express can serve `index.html` automatically for the folder root; this project
also has an explicit `GET /` route that sends `public/index.html`.

### Formatting JSON in the browser
In `app.js`, `JSON.stringify(value, null, 2)` formats a parsed JSON response
with two-space indentation before displaying it. If the response is not JSON,
the page displays the original text instead.

### Development script
The `dev` script runs `node --watch server.js`. Node's built-in watch mode
restarts the server when the file changes, so I can test edits without
restarting it manually or installing another package.

## Challenges faced
found it challenging to apply express.static in it's correct format as well as it was challenging to figure out the file opraginzation and why middleware supposed to be in the top while the app listener at the bottom. 

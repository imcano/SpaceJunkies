## There are 3 avaliable scripts.

# Client Side Web App
### `npm run start`

Runs this command on the root of the project. 
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits


# Back-End Web Socket Python Server
Go to the /back-end directory.

### `python3 ws_server.py -h <host> -p <port>`

Starts our websocket webserver that takes input from website client and response to all clients connected to ws://<host>:<port>

# Raspberry Pi Web Socket client 
### `python3 rasberry_client.py -h <host> -p <port>`

This starts a websocket client to ws://<host>:<port>. Listen for messages and moves the rasbery pi via message.

# Example of Running Script

##### Start web socket server
Go to /back-end and run.
`python3 ws_server.py -h localhost -p 3030`

##### Start webpage
Go to the root of the project.
`npm run start`
Open [http://localhost:3000](http://localhost:3000)

##### Start Raspberry Pi Web Client
Go to /back-end and run.
`python3 rasberry_client.py -h localhost -p 3030`

#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets
import sys, getopt

logging.basicConfig()

# our state dictionary
STATE = {'direction': 'stop'}
# our user set
USERS = set()
# our rasberry pie status
RP_STATUS = False

# state of application, this deconstructs the STATE object into a string.
# important thing to note is that we can store any information here..
# could possibly store sensor data here...
# only thing being saved as of now is direction.
def state_event():
    return json.dumps({'type': 'state', **STATE})

# simple state of user. Important variable is rp_status
def users_event():
    return json.dumps({'type': 'users', 'count': len(USERS), 'rp_status': RP_STATUS})

async def notify_state():
    if USERS:       # asyncio.wait doesn't accept an empty list
		# grabs string from state_event()
        message = state_event()
		# sends each user new state.
        await asyncio.wait([user.send(message) for user in USERS])

async def notify_users():
	# sends a message to all users.
	if USERS:
		# grabs string from user_event()
		message = users_event()
		# sends to each user. 
		await asyncio.wait([user.send(message) for user in USERS])

async def register(websocket):
	# checks to see if Device is in header
	if 'Device' in websocket.request_headers:
		# if device header is rp
		if websocket.request_headers['Device'] == 'rp':
			# change global RP_STATUS to true.
			global RP_STATUS 
			RP_STATUS = True
	# Add websocket to user set
	USERS.add(websocket)
	# notify all user.
	await notify_users()


async def unregister(websocket):
	# checks to see if Device is in header.
	if 'Device' in websocket.request_headers:
		if websocket.request_headers['Device'] == 'rp':
			# change global RP_STATUS to false
			global RP_STATUS 
			RP_STATUS = False
	# Removes websocket from user set
	USERS.remove(websocket)
	# notifies all clients.
	await notify_users()


async def web_socket_server(websocket, path):
	# register(websocket) sends user_event() to websocket
	await register(websocket)
	try:
		async for message in websocket:
			# grabs message from websocket.
			data = json.loads(message)
			Previous = STATE['direction']
			# checks to see if change in state
			if Previous != data['direction']:
				# changes state based on data
				STATE['direction'] = data['direction']
				Previous = data['direction']
				# sends new state to clients
				await notify_state()
	finally:
		# on disconnect unregister the websocket from user set.
		await unregister(websocket)



# handling arguments to spin up server with the following tags
# -h <host> and -p <port>
def main(argv):
	host = ''
	port = ''
	try:
		opts, args = getopt.getopt(argv,"ih:p:",["host=","port="])
	except getopt.GetoptError:
		print ('ws_server.py -h <host> -p <port>')
		sys.exit(2)
	for opt, arg in opts:
		if opt == '-i':
			print ('ws_server.py -h <host> -p <port>')
			sys.exit()
		elif opt in ("-h", "--host"):
			host = arg
		elif opt in ("-p", "--port"):
			port = arg
	print(f"Listening on {host}:{port}")
	asyncio.get_event_loop().run_until_complete(websockets.serve(web_socket_server, host, int(port)))
	asyncio.get_event_loop().run_forever()
	
   
# calling this script via terminal.
if __name__ == "__main__":
	main(sys.argv[1:])


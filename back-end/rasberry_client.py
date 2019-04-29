#!/usr/bin/env python
import asyncio
import websockets
import json
import sys, getopt


async def rasberry_client(HOST, PORT):
	# web socket connection with extra headers being sent to detect this device as a rasberry pie.
	async with websockets.connect(f'ws://{HOST}:{PORT}', extra_headers={"Device": "rp"}) as websocket:
		while True:
			# await response from server
			feed = await websocket.recv()
			# parse json
			data = json.loads(feed)
			f = open('commands.txt', 'w')
			json.dump(data, f)
			f.close()

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
	print(f"Client on {host}:{port}")
	asyncio.get_event_loop().run_until_complete(rasberry_client(host, port))
	asyncio.get_event_loop().run_forever()
	
   
# calling this script via terminal.
if __name__ == "__main__":
	main(sys.argv[1:])


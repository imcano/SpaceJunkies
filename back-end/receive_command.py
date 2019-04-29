#!/usr/bin/env python3

import socket
from servos import data_validation


HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 65432        # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    i = 0
    while 2:
        # s.sendall(b'Hello, world')
        data = s.recv(1024)
        print(data, i)
        data_validation(data)
        i += 1

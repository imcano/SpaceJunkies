#!/usr/bin/env python3

import json
import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        i = 0
        while 1:
            # data = conn.recv(1024)
            cmds = open('commands.txt', 'r')
            data = cmds.read().encode('utf-8')
            print(data, i)
            conn.send(data)
            i+=1
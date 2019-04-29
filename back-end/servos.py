'''
This module is controls the servos on the robot.  It is listening for commands on the
given port for commands.  The command are unit vectors in the format 'y,x,r' where x and y
are unit vectors that describe the move and r is rotate.  Forward = -Y, Right = X, CW = >0.

                 F = (-1,0)
                  Servo 0
  (-0.707,-0.707)    ^     (-0.707,0.707)
                 \   |    /
                   -----
      L = (0,-1)  |     |  R = (0,1)
       Servo 1    |     |   Servo 3
                   -----
                 /       \
   (0.707,-0.707)         (0.707,0.707)
                 B = (1,0)
                  Servo 2
          
Servo PWM signal ranges from full clockwise speed = 1300us, no movement = 1520us, full counter clockwise = 1700us
'''

import json
import os
import socket


print ("Listening for robot commands..." )

pwm_no_motion = 1520    # This is the pwm for no motion in us (1520us)
pwm_delta_full_speed = 180    # This is the pulse width that will be added/subtracted from the no motion pwm in us (180us)

servo_0 = pwm_no_motion    # Initialize the servo pwm as no motion
servo_1 = pwm_no_motion    # Initialize the servo pwm as no motion
servo_2 = pwm_no_motion    # Initialize the servo pwm as no motion
servo_3 = pwm_no_motion    # Initialize the servo pwm as no motion

def data_validation(data):
	data = json.loads(str(data, 'utf-8'))
	
	if data['type'] == 'state':
		# grab direction
		direction = data['direction']
		# 0,0,0 is not moving.
		string = '0,0,0'
		# change string based on direction
		if direction == 'up':
			string = '-1,0,0'
		elif direction == 'down':
			string = '1,0,0'
		elif direction == 'right':
			string = '0,1,0'
		elif direction == 'left':
			string = '0,-1,0'
		elif direction == 'rotateX':
			string = '0,0,1'
		elif direction == 'rotateY':
			string = '0,0,-1'
		print(f'\n{string}\n{direction}')
		# send data to servo
		handleServo(string)			

# servo logic 
def handleServo(val):

	if val.split(',')[2] != '0':    # This is a rotation
		print('Rotate')
		servo_0 = int(pwm_no_motion + float(val.split(',')[2]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion
		servo_2 = int(pwm_no_motion + float(val.split(',')[2]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion

		servo_1 = int(pwm_no_motion + float(val.split(',')[2]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion
		servo_3 = int(pwm_no_motion + float(val.split(',')[2]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion

	else:    # This is a translation
		print('Translate')
		servo_0 = int(pwm_no_motion + float(val.split(',')[1]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion
		servo_2 = int(pwm_no_motion - float(val.split(',')[1]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion

		servo_1 = int(pwm_no_motion - float(val.split(',')[0]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion
		servo_3 = int(pwm_no_motion + float(val.split(',')[0]) * pwm_delta_full_speed)    # Determine the pwm for the desired motion

	print ('Servo 0:', servo_0)
	print ('Servo 1:', servo_1)
	print ('Servo 2:', servo_2)
	print ('Servo 3:', servo_3)

	os.system("echo 0=" + str(servo_0) + "us > /dev/servoblaster")
	os.system("echo 1=" + str(servo_1) + "us > /dev/servoblaster")
	os.system("echo 2=" + str(servo_2) + "us > /dev/servoblaster")
	os.system("echo 3=" + str(servo_3) + "us > /dev/servoblaster")
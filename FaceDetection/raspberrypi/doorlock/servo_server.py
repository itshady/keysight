import servo_pb2
import servo_pb2_grpc
import RPi.GPIO as GPIO  # Imports the standard Raspberry Pi GPIO library
from time import sleep   # Imports sleep (aka wait or pause) into the program


class DoorLock(servo_pb2_grpc.DoorLock):
  def Unlock(self, request, context):
    self.runServo(goLeft=True)
    print("unlock requested")
    
    return servo_pb2.UnlockResponse(success=1)

  def Lock(self, request, context):
    self.runServo(goLeft=False)
    print("lock requested")
    return servo_pb2.LockResponse(success=1)

  def runServo(self, goLeft=True):
    GPIO.setmode(GPIO.BOARD) # Sets the pin numbering system to use the physical layout

    # Set up pin 11 for PWM
    GPIO.setup(11,GPIO.OUT)  # Sets up pin 11 to an output (instead of an input)
    p = GPIO.PWM(11, 50)     # Sets up pin 11 as a PWM pin
    p.start(0)               # Starts running PWM on the pin and sets it to 0

    # THREAD THIS
    if goLeft:
      p.ChangeDutyCycle(3)     # Changes the pulse width to 3 (so moves the servo)
    else:
      p.ChangeDutyCycle(12)    # Changes the pulse width to 12 (so moves the servo)
    sleep(1)

    # Clean up everything
    p.stop()                 # At the end of the program, stop the PWM
    GPIO.cleanup()           # Resets the GPIO pins back to defaults
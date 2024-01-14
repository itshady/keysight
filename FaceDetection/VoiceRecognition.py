import speech_recognition as sr
import pyttsx3 
from database import Database

# GRPC STUFF
import grpc
from raspberrypi.doorlock import servo_pb2_grpc
from raspberrypi.doorlock import servo_pb2
import time

db = Database()
u = db.getUsers()
uids = [
    "1j1xpbkPQscOHNcC3Gnmqmr4DFW2",
    "A8uBHicEI2NjcmCJHfzHOhgbidc2",
    "hXGLNY5aLChDAbtmBaIBoJdbWEF3"
]

# Initialize the recognizer 
r = sr.Recognizer()

#NEEDS TO BE PULLED FROM FIREBASE
unlocked = False 
keyword1 = "unlock"
keyword2 = "leaving"
keyword3 = "open"


def SpeakText(command):
    
    engine = pyttsx3.init()
    engine.setProperty('rate',145)
    engine.say(command) 
    engine.runAndWait()

def unlock():
    with grpc.insecure_channel('192.168.0.167:8081') as channel:
        stub = servo_pb2_grpc.DoorLockStub(channel)
        response = stub.Unlock(servo_pb2.UnlockRequest())
        print("Unlocked client received: " + str(response.success))


while(1):
    try:
        with sr.Microphone() as source:
            print("c")
            # wait for a second to let the recognizer adjust the energy threshold based on surrounding noise level 
            r.adjust_for_ambient_noise(source, duration=0.5)
            
            print("Listening...")
            
            audio = r.listen(source, phrase_time_limit=2.5) #listens for the user's input 
            Phrase = r.recognize_google(audio)
            Phrase = Phrase.lower()
            print("Heard: ", Phrase)
            
            if (keyword1 in Phrase and db.isHome(uids[0])):
                print("keyword detected")
                db.isLeaving(uids[0])
                unlock()
            elif (keyword2 in Phrase and db.isHome(uids[1])):
                print("keyword detected")
                db.isLeaving(uids[1])
                unlock()
            elif (keyword3 in Phrase and db.isHome(uids[2])):
                print("keyword detected")
                db.isLeaving(uids[2])
                unlock()
            

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
        
    except sr.UnknownValueError:
        continue

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
uids = list(u.keys())

# Initialize the recognizer 
r = sr.Recognizer()

#NEEDS TO BE PULLED FROM FIREBASE
unlocked = False 
housename = "Bowman"
keyword1 = "unlock"
keyword2 = "apple"
keyword3 = "banana"


def SpeakText(command):
    
    engine = pyttsx3.init()
    engine.setProperty('rate',145)
    engine.say(command) 
    engine.runAndWait()

def unlock():
    with grpc.insecure_channel('192.168.40.51:8081') as channel:
        stub = servo_pb2_grpc.DoorLockStub(channel)
        response = stub.Unlock(servo_pb2.UnlockRequest())
        print("Unlocked client received: " + str(response.success))

print(db.isHome(uids[0]))


while(1):
    try:
        with sr.Microphone() as source:
            print("c")
            # wait for a second to let the recognizer adjust the energy threshold based on surrounding noise level 
            r.adjust_for_ambient_noise(source, duration=0.5)
            
            print("Listening...")
            
            audio = r.listen(source, phrase_time_limit=3) #listens for the user's input 
            Phrase = r.recognize_google(audio)
            Phrase = Phrase.lower()
            print("Heard: ", Phrase)
            
            if (Phrase==keyword1):
                print("keyword detected")
                db.isLeaving(uids[0])
                unlock()
            elif (Phrase==keyword2):
                print("keyword detected" and db.isHome(uids[1]))
                db.isLeaving(uids[1])
                unlock()
            elif (Phrase==keyword3):
                print("keyword detected" and db.isHome(uids[2]))
                db.isLeaving(uids[2])
                unlock()
            

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
        
    except sr.UnknownValueError:
        continue

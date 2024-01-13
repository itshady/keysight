import speech_recognition as sr
import pyttsx3 
from database import Database


db = Database()
u = db.getUsers()
uids = list(u.keys())

# Initialize the recognizer 
r = sr.Recognizer()

#NEEDS TO BE PULLED FROM FIREBASE
unlocked = False 
housename = "Bowman"
keyword = "unlock"


def SpeakText(command):
    
    engine = pyttsx3.init()
    engine.setProperty('rate',145)
    engine.say(command) 
    engine.runAndWait()

def unlock():
    #push to firebase
    print("unlocked")
    db.isLeaving(uids[0])


while(1):
    try:
        with sr.Microphone() as source:
            print("Listening...")
            # wait for a second to let the recognizer adjust the energy threshold based on surrounding noise level 
            r.adjust_for_ambient_noise(source, duration=0.2)
            
            audio = r.listen(source, phrase_time_limit=1.5) #listens for the user's input 
            
            Phrase = r.recognize_google(audio)
            Phrase = Phrase.lower()
            if (Phrase == keyword):
                print("keyword detected")
                unlock()

            print("Heard: ", Phrase)

    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))
        
    except sr.UnknownValueError:
        continue

import cv2
import numpy as np
import time
import os
import pyttsx3
import threading
from alert import alertclient
from database import Database



#NEEDS TO BE PULLED FROM FIREBASE
unlocked = False 
housename = "Bowman"
#user names

def SpeakText(command):
	
	engine = pyttsx3.init()
	engine.setProperty('rate',145)
	engine.say(command) 
	engine.runAndWait()

def unlock():
    #push to firebase
    print("unlocked")


recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('FaceDetection/trainer/trainner.yml')
cascadePath = "FaceDetection/haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

cam = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_SIMPLEX
font2 = cv2.FONT_HERSHEY_DUPLEX


readingA =0
readingU=0
response=""
talk = True


db = Database()
u = db.getUsers()
uids = list(u.keys())

while(1):

    color = (0,0,255) ## RED
    ret, im =cam.read()
    gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    faces=faceCascade.detectMultiScale(gray, 1.2,5)
    
    for(x,y,w,h) in faces:
        cv2.rectangle(im,(x,y),(x+w,y+h),(255,131,96),2)
        Id, conf = recognizer.predict(gray[y:y+h,x:x+w])
    
        # print("Confidence Level = " + str(conf))
        if unlocked == False:
            if(conf<46):               
                color = (0,255,0)
                if(Id==1):
                    
                    if(conf < 51):
                        
                        if talk:
                            talk = False
                            t1 = threading.Thread(target=SpeakText, args=("Himanshu",))
                            t1.start()
                        check=1
                        readingA = readingA +1
                        readingU = 0                        
                    
                elif(Id==2):
                    readingA = readingA +1
                    readingU = 0

                elif(Id==3):
                    readingA = readingA +1
                    readingU = 0
                elif(Id==4):     
                    readingA = readingA +1
                    readingU = 0
                elif(Id==5):
                    readingA = readingA +1
                    readingU = 0
                    
            else:
                Id="Unknown"
                readingA=0
                readingU = readingU + 1
            
            cv2.putText(im, "User "+str(Id), (x - 1, y - 1), font,0.5,(255, 255, 255),2)

            cv2.namedWindow("keysight", cv2.WINDOW_NORMAL)
            # cv2.namedWindow("keysight", cv2.WND_PROP_FULLSCREEN) 
            # cv2.setWindowProperty("keysight",cv2.WND_PROP_FULLSCREEN,cv2.WINDOW_FULLSCREEN)
            cv2.imshow('keysight', im )
            progress =  str(  (readingA/20)*100 )
            cv2.putText(im, "Scanning%: " + progress , (10, 450), font, 0.5, (255,255,255) , 2)      

            if(readingA>=20):
                readingA=0
                unlocked = True
                unlock()
                db.isEntering(uids[Id-1])

            if(readingU>70):
                alertclient()
                readingU=0

    
    # cv2.namedWindow("keysight", cv2.WINDOW_NORMAL)
    cv2.imshow('keysight', im )

    if cv2.waitKey(10) ==ord('q'):
        break
    
cam.release()
cv2.destroyAllWindows()

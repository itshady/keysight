import cv2
import numpy as np
import time
import os
import pyttsx3
import threading
import alert



#NEEDS TO BE PULLED FROM FIREBASE
unlocked = False 
housename = "Bowman"

def SpeakText(command):
	
	engine = pyttsx3.init()
	engine.setProperty('rate',145)
	engine.say(command) 
	engine.runAndWait()

def unlock():
    #push to firebase
    print("unlocked")

def alert():
    print("alerting")


recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('trainer/trainner.yml')
cascadePath = "haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascadePath)

cam = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_SIMPLEX
font2 = cv2.FONT_HERSHEY_DUPLEX


readingA =0
readingU=0
response=""

while(1):

    color = (0,0,255) ## RED
    ret, im =cam.read()
    gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    faces=faceCascade.detectMultiScale(gray, 1.2,5)
    
    for(x,y,w,h) in faces:
        cv2.rectangle(im,(x,y),(x+w,y+h),(225,0,0),2)
        Id, conf = recognizer.predict(gray[y:y+h,x:x+w])
    
        # print("Confidence Level = " + str(conf))
        if unlocked == False:
            if(conf<46):               
                color = (0,255,0) ## update GREEN
                if(Id==1):
                    
                    Id="User1"
                    if(conf < 51):
                        #t1 = threading.Thread(target=SpeakText, args=("Himanshu",))
                        #t1.start()
                        # response = "START.mp3"
                        check=1
                        readingA = readingA +1
                        readingU = 0
                        ##time.sleep(3)
                        
                    
                elif(Id==2):
                    Id="User2"
                    readingA = readingA +1
                    readingU = 0
                    # response = "USER1.mp3"

                elif(Id==3):
                    Id="User3"
                    readingA = readingA +1
                    readingU = 0
                    # response = "USER2.mp3"
                elif(Id==4):
                    Id="User4"      
                    readingA = readingA +1
                    readingU = 0
                    # response = "USER3.mp3"
                elif(Id==5):
                    Id="User5" 
                    readingA = readingA +1
                    readingU = 0
                    # response = "USER4.mp3"
                    
            else:
                Id="Unknown"
                readingA=0
                readingU = readingU + 1
            
            cv2.putText(im, Id, (x - 1, y - 1), font,0.5,(0, 255, 0),2)

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

            if(readingU/10>10):
                alert()

    
    # cv2.namedWindow("keysight", cv2.WINDOW_NORMAL)
    cv2.imshow('keysight', im )

    if cv2.waitKey(10) ==ord('q'):
        break
    
cam.release()
cv2.destroyAllWindows()

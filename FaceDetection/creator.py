import numpy as np
import cv2

igniter = 8880 # just a random number to avoid overwriting file names
detector= cv2.CascadeClassifier('FaceDetection/haarcascade_frontalface_default.xml')
cap = cv2.VideoCapture(0) #open webcam

id =input('enter the ID #') 
# id=1
sampleNum = 1
while(True):
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector.detectMultiScale(gray, 1.3, 5)
    for (x,y,w,h) in faces:
        
        sampleNum = sampleNum+1
        cv2.imwrite("FaceDetection/dataSet/User." + str(id) + "." + str(sampleNum*igniter) + ".jpg", gray[y:y+h, x:x+w])
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        cv2.waitKey(150)
    cv2.imshow('frame',img)
    cv2.waitKey(2)
    if(sampleNum > 250):
        break
cap.release()
cv2.destroyAllWindows()

print('Collection Complete')

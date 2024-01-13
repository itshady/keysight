import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import uuid
from datetime import datetime

class Database:
    def __init__(self):
        # Fetch the service account key JSON file contents
        cred = credentials.Certificate('smart-lock-31bb9-firebase-adminsdk-ztgy7-fc35998f3d.json')

        # Initialize the app with a service account, granting admin privileges
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://smart-lock-31bb9-default-rtdb.firebaseio.com/',
            # 'databaseAuthVariableOverride': None
        })

        # As an admin, the app has access to read and write all data, regradless of Security Rules
        self.ref = db.reference(path='/', app=None, url=None)
        self.users_ref = self.ref.child('users')
        self.logs_ref = self.ref.child('logs')

    #if the user is entering the python program should call, isEntering(user) -> addLog(user, time, "[user] has entered the house.")
    def isEntering(self, user):
       #if the userid is the same as the one in the database, set status to true, else do nothing
        user_node_ref = self.users_ref.child(user)
        user_node_ref.update({'isHome': True})
        name = self.getUser(user)["name"]
        self.addLog(name, user, datetime.now(), "Enter")

    #if the user is leaving, the python program should call, isLeaving() -> addLog(user, time, "[user] has left the house.")
    def isLeaving(self, user):
        user_node_ref = self.users_ref.child(user)
        user_node_ref.update({'isHome': False})
        name = self.getUser(user)["name"]
        self.addLog(name, user, datetime.now(), "Leave")

    # returns true if the user is home, else false
    def isHome(self, user) -> bool:
        user_data = self.users_ref.child(user).get()
        if user_data:
            return user_data['isHome']
        else: #if the status does not exist 
            return False

    # the idea is that to add a log, from himanshus python file the options are: 
    # if the person is recognized and they are entering -> user is notted down, time is notted down, purpose is "Entered the house."
    # if the person is not recognized, the python program asks for their reason to enter -> user is jotted down as guest, time is notted down, purpose is defined based on the python popup or the voice recognition item
    def addLog(self, username, useruid, datetime, purpose="none") -> None:        
        key = str(uuid.uuid4())
        self.logs_ref.child(key).set({
            'time': datetime.isoformat(),
            'useruid': useruid,
            'purpose': purpose,
            'username': username,
        })

    # returns logs in order
    def getLogs(self):
        snapshot = self.logs_ref.order_by_child('time').get()
        return snapshot

    # returns a list of all users in the database
    def getUsers(self):
        return self.users_ref.get()
    
    def getUser(self, uid):
        users = self.getUsers()
        return users[uid]

def main():
    db = Database()

    u = db.getUsers()
    # print(u)
    uids = list(u.keys())
    # print(uids)
    db.addLog(u[uids[0]]["name"], uids[0], datetime.now(), "testing purpose 2")
    # for key, val in db.getLogs().items():
    #     print(key, val)
    db.isEntering(uids[0])
    print(db.isHome(uids[0]))
    # db.isLeaving(uids[0])
    print(db.isHome(uids[0]))


main()
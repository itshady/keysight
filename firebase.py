import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Fetch the service account key JSON file contents
cred = credentials.Certificate('smart-lock-31bb9-firebase-adminsdk-ztgy7-fc35998f3d.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://smart-lock-31bb9-default-rtdb.firebaseio.com/',
    # 'databaseAuthVariableOverride': None
})

# As an admin, the app has access to read and write all data, regradless of Security Rules
ref = db.reference(path='/', app=None, url=None)

# Commit to database
users_ref = ref.child('users')
users_ref.set({
    'alanisawesome': {
        'date_of_birth': 'June 23, 1912',
        'full_name': 'Alan Turing'
    },
})

# Delete a full table by just setting it to empty json
# ref.child('users').set({})
print(ref.child('users').get())
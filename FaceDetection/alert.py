# import twilio
from twilio.rest import Client

account_sid = 'ACd3088bd99295760f1284b60df08a5259'
auth_token = '24d6bba8904852cebe8b2cbb00d26470'
twilio_number = '+14406932491'
target_number = '+16135815074'
#AFDU5C5URSZT1R1ABBSBDWQK

def alertclient():
    print("alerted")
    # client = Client(account_sid, auth_token)

    # message = client.messages.create(
    #     body="An unrecognized individual is at your door, log-in for more info",
    #     from_=twilio_number,
    #     to=target_number
    # )
    # print(message.body)
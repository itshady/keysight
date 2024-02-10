import grpc
import servo_pb2_grpc
import servo_pb2
import time

def run():
  with grpc.insecure_channel('192.168.40.51:8081') as channel:
    stub = servo_pb2_grpc.DoorLockStub(channel)
    response = stub.Unlock(servo_pb2.UnlockRequest())
    print("Unlocked client received: " + str(response.success))
    time.sleep(1)
    response = stub.Lock(servo_pb2.LockRequest())
    print("Locked client received: " + str(response.success))

run()
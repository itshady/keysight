import servo_pb2
import servo_pb2_grpc

class DoorLock(servo_pb2_grpc.DoorLock):
  def Unlock(self, request, context):
    print("unlock requested")
    return servo_pb2.UnlockResponse(success=1)

  def Lock(self, request, context):
    print("lock requested")
    return servo_pb2.LockResponse(success=1)
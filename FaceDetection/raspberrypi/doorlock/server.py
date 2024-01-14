import grpc
import servo_pb2_grpc
import servo_server
from concurrent import futures

def main():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

  servo_pb2_grpc.add_DoorLockServicer_to_server(
    servo_server.DoorLock(), server
  )

  addr = "192.168.0.167:8081"
  server.add_insecure_port(addr)
  server.start()
  print("Listening on " + addr)
  server.wait_for_termination()

main()
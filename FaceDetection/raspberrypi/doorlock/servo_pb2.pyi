from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class UnlockRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class LockRequest(_message.Message):
    __slots__ = ()
    def __init__(self) -> None: ...

class UnlockResponse(_message.Message):
    __slots__ = ("success",)
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    success: int
    def __init__(self, success: _Optional[int] = ...) -> None: ...

class LockResponse(_message.Message):
    __slots__ = ("success",)
    SUCCESS_FIELD_NUMBER: _ClassVar[int]
    success: int
    def __init__(self, success: _Optional[int] = ...) -> None: ...

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from app.models import User


class Task(BaseModel):
    id: str
    content: str


class Tasks(BaseModel):
    __root__: dict[str, Task]


class Column(BaseModel):
    id: str
    title: str
    taskIds: list[str]


class Columns(BaseModel):
    __root__: dict[str, Column]


class Board(BaseModel):
    tasks: Tasks
    columns: Columns
    columnOrder: list[str]


User_Pydantic = pydantic_model_creator(User, name="User")
UserIn_Pydantic = pydantic_model_creator(
    User, name="UserIn", exclude_readonly=True, exclude=("board",)
)
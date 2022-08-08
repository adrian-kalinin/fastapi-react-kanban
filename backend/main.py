from fastapi import FastAPI
from pydantic import BaseModel
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator

from app.models import User

app = FastAPI()


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


@app.get("/api/board")
async def board():
    board_data = {
        "tasks": {
            "task-1": {"id": "task-1", "content": "Create video"},
            "task-2": {"id": "task-2", "content": "Edit video"},
            "task-3": {"id": "task-3", "content": "Publish video"},
        },
        "columns": {
            "column-1": {
                "id": "column-1",
                "title": "To Do",
                "taskIds": ["task-2", "task-3"],
            },
            "column-2": {
                "id": "column-2",
                "title": "Done",
                "taskIds": ["task-1"],
            },
        },
        "columnOrder": ["column-1", "column-2"],
    }

    return {"board": board_data}


@app.on_event("startup")
def foo():
    register_tortoise(
        app,
        db_url="postgres://postgres:Password1@db:5432/postgres",
        modules={"models": ["app.models"]},
        generate_schemas=True,
        add_exception_handlers=True,
    )

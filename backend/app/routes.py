from fastapi import APIRouter

router = APIRouter()


@router.get("/board")
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

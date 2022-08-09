from fastapi import APIRouter

from app.models import User
from app.schemas import Board

router = APIRouter()


@router.get("/board")
async def get_board():
    user = await User.get(id=1)

    return {"board": user.board}


@router.put("/board")
async def save_board(board: Board):
    user = await User.get(id=1)
    user.board = board.json()
    await user.save()

    return {"message": "success"}

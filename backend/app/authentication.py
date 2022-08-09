from typing import Union

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.config import settings
from app.models import User
from app.schemas import User_Pydantic

oath2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def create_token(user: User) -> str:
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    return jwt.encode(user_obj.dict(), settings.jwt_secret)


async def authenticate_user(username: str, password: str) -> Union[User_Pydantic, bool]:
    user = await User.get(username=username)

    if not user or not user.verify_password(password):
        return False

    return user


async def get_current_user(token: str = Depends(oath2_scheme)):
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=["HS256"])
        user = await User.get(id=payload.get("id"))

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return await User_Pydantic.from_tortoise_orm(user)

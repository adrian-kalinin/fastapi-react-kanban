from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from app.routes import router


def create_app() -> FastAPI:
    application = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

    application.include_router(router, prefix="/api")

    register_tortoise(
        application,
        db_url="postgres://postgres:Password1@db:5432/postgres",
        modules={"models": ["app.models"]},
        generate_schemas=True,
        add_exception_handlers=True,
    )

    return application


app = create_app()

FROM python:3.10-alpine

ENV PYTHONUNBUFFERED 1
WORKDIR /app/api

COPY requirements.txt .
RUN apk add gcc libc-dev libffi-dev
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

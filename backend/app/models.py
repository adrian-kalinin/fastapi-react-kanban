from passlib.hash import bcrypt
from tortoise import fields
from tortoise.models import Model


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, unique=True)
    password = fields.CharField(max_length=200)
    board = fields.JSONField(default={"tasks": {}, "columns": {}, "columnOrder": []})

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)

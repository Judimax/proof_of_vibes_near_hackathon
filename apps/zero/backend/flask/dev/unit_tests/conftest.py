import os
import tempfile
from app import app


import pytest

@pytest.fixture
def app_test():

    app.config.update(
      TESTING= True,
    )

    # before each


    yield app

    # after each



@pytest.fixture
def client(app_test):
    return app_test.test_client()


@pytest.fixture
def runner(app_test):
    return app_test.test_cli_runner()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username='test', password='test'):
        return self._client.post(
            '/auth/login',
            data={'username': username, 'password': password}
        )

    def logout(self):
        return self._client.get('/auth/logout')


@pytest.fixture
def auth(client):
    return AuthActions(client)

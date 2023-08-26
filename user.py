class User:
    def __init__(self, user_id, username=None):
        self.user_id = user_id
        self.username = username
        self.room = None

    def join_room(self, room):
        self.room = room

    def leave_room(self):
        self.room = None

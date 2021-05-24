from model import Model


class Status(Model):
    """
    An abstract status. Extends Model.
    """

    def __init__(self):
        super().__init__()


class ToDoStatus(Status):
    """
    A to-do status. Extends Status.
    """
    pass


class DoingStatus(Status):
    """
    A doing status. Extends Status.
    """
    pass


class DoneStatus(Status):
    """
    A done status. Extends Status.
    """
    pass


class AbandonedStatus(Status):
    """
    An abandoned status. Extends Status.
    """
    pass

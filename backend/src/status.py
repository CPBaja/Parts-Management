from model import Model


class Status(Model):
    """
    An abstract status. Extends Model.
    """

    def __init__(self):
        super().__init__()
        self._type = type(self).__name__


class ToDoStatus(Status):
    """
    A to-do status. Extends Status.
    """

    def __init__(self):
        super().__init__()


class DoingStatus(Status):
    """
    A doing status. Extends Status.
    """

    def __init__(self):
        super().__init__()


class DoneStatus(Status):
    """
    A done status. Extends Status.
    """

    def __init__(self):
        super().__init__()


class OrderedStatus(Status):
    """
    An ordered status. Extends Status.
    """

    def __init__(self):
        super().__init__()


class ShippedStatus(Status):
    """
    A shipped status. Extends Status.
    """

    def __init__(self):
        super().__init__()


class ArrivedStatus(Status):
    """
    An arrived status. Extends Status.
    """

    def __init__(self):
        super().__init__()


class AbandonedStatus(Status):
    """
    An abandoned status. Extends Status.
    """

    def __init__(self):
        super().__init__()

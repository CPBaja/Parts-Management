from model import Model


class Priority(Model):
    """
    An abstract priority. Extends Model.
    """

    def __init__(self):
        super().__init__()
        self._type = type(self).__name__


class YesterdayPriority(Priority):
    """
    A yesterday priority. Extends Priority.
    """

    def __init__(self):
        super().__init__()


class ThisWeekPriority(Priority):
    """
    A this week priority. Extends Priority.
    """

    def __init__(self):
        super().__init__()


class ThisMonthPriority(Priority):
    """
    A this month priority. Extends Priority.
    """

    def __init__(self):
        super().__init__()


class ThisQuarterPriority(Priority):
    """
    A this quarter priority. Extends Priority.
    """

    def __init__(self):
        super().__init__()


class ThisYearPriority(Priority):
    """
    A this year priority. Extends Priority.
    """

    def __init__(self):
        super().__init__()


class CompletedPriority(Priority):
    """
    A completed priority. Extends Priority.
    """

    def __init__(self):
        super().__init__()

from model import Model


class Priority(Model):
    """
    An abstract priority. Extends Model.
    """

    def __init__(self):
        super().__init__()


class YesterdayPriority(Priority):
    """
    A yesterday priority. Extends Priority.
    """
    pass


class ThisWeekPriority(Priority):
    """
    A this week priority. Extends Priority.
    """
    pass


class ThisMonthPriority(Priority):
    """
    A this month priority. Extends Priority.
    """
    pass


class ThisQuarterPriority(Priority):
    """
    A this quarter priority. Extends Priority.
    """
    pass


class ThisYearPriority(Priority):
    """
    A this year priority. Extends Priority.
    """
    pass

from model import Model


class Material(Model):
    """
    An abstract material. Extends Model.
    """

    def __init__(self):
        super().__init__()
        self._type = type(self).__name__


class Aluminum(Material):
    """
    An aluminum material. Extends Material.
    """

    def __init__(self, alloy):
        super().__init__()
        self.alloy = alloy


class CarbonFiber(Material):
    """
    An aluminum material. Extends Material.
    """

    def __init__(self):
        super().__init__()


class Steel(Material):
    """
    A steel material. Extends Material.
    """

    def __init__(self, alloy):
        super().__init__()
        self.alloy = alloy

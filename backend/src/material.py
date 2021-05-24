from model import Model


class Material(Model):
    """
    An abstract material. Extends Model.
    """

    def __init__(self):
        super().__init__()


class Aluminum(Material):
    """
    An aluminum material. Extends Material.
    """

    def __init__(self, alloy):
        self.alloy = alloy


class CarbonFiber(Material):
    """
    An aluminum material. Extends Material.
    """
    pass


class Steel(Material):
    """
    A steel material. Extends Material.
    """

    def __init__(self, alloy):
        self.alloy = alloy

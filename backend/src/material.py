
class Material:
    """
    An abstract material.
    """
    pass


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

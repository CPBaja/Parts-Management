
class Stock:
    """
    An abstract stock.
    """
    def __init__(self, material, quantity, length):
        self.material = material
        self.quantity = quantity
        self.length = length


class Sheet(Stock):
    """
    A sheet stock. Extends Stock.
    """
    def __init__(self, material, quantity, length, width, thickness):
        super().init(material, quantity, length)
        self.width = width
        self.thickness = thickness


class Plate(Stock):
    """
    A plate stock. Extends Stock.
    """
    def __init__(self, material, quantity, length, width, thickness):
        super().init(material, quantity, length)
        self.width = width
        self.thickness = thickness


class BarStock(Stock):
    """
    A bar stock. Extends Stock.
    """
    def __init__(self, material, quantity, length, width, height):
        super().init(material, quantity, length)
        self.width = width
        self.height = height


class RoundStock(Stock):
    """
    A round stock. Extends Stock.
    """
    def __init__(self, material, quantity, length, diameter):
        super().init(material, quantity, length)
        self.diameter = diameter


class RectTubeStock(Stock):
    """
    A rectangular tube stock. Extends Stock.
    """
    def __init__(self, material, quantity, length,
                 outer_width, outer_height, wall_thickness):
        super().init(material, quantity, length)
        self.outer_width = outer_width
        self.outer_height = outer_height
        self.wall_thickness = wall_thickness


class RoundTubeStock(Stock):
    """
    A round tube stock. Extends Stock.
    """
    def __init__(self, material, quantity, length,
                 outer_diameter, wall_thickness):
        super().init(material, quantity, length)
        self.outer_diameter = outer_diameter
        self.wall_thickness = wall_thickness

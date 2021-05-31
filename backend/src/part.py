from bson import ObjectId
from model import Model
import material
import priority
import status
import stock


class Part(Model):
    """
    An abstract part. Extends Model.
    """

    collection = Model.client.parts.parts

    def __init__(self, **kwargs):
        super().__init__()
        self._type = type(self).__name__
        self.name = ""
        self.subsystem = ""
        self.subassembly = ""
        self.quantity_gonogo = 0
        self.quantity_competition = 0
        self.quantity_available = 0
        self.ordering_status = status.ToDoStatus()
        self.ordering_priority = priority.ThisYearPriority()
        self.vendor = ""
        self.vendor_cost = 0
        self.vendor_link = ""
        self.notes = ""

        # Overwrite attributes from kwargs at the end
        self.update(kwargs)


class PurchasedPart(Part):
    """
    A purchased part. Extends Part.
    """

    def __init__(self, **kwargs):
        # Overwrite attributes from kwargs at the end
        super().__init__(**kwargs)


class FastenerPart(PurchasedPart):
    """
    A fastener part. Extends PurchasedPart.
    """

    def __init__(self, **kwargs):
        self.vendor_sku = ""

        # Overwrite attributes from kwargs at the end
        super().__init__(**kwargs)


class BearingPart(PurchasedPart):
    """
    A bearing part. Extends PurchasedPart.
    """

    def __init__(self, **kwargs):
        self.trade_number = ""

        # Overwrite attributes from kwargs at the end
        super().__init__(**kwargs)


class ManufacturedPart(Part):
    """
    A manufactured part. Extends Part.
    """

    def __init__(self, **kwargs):
        self.stock = stock.Stock(material.Material(), 0, 0)
        self.manufacturing_status = status.ToDoStatus()
        self.manufacturing_priority = priority.ThisYearPriority()
        self.machines_and_processes = ""
        self.cad_link = ""
        self.dwg_link = ""

        # Overwrite attributes from kwargs at the end
        super().__init__(**kwargs)

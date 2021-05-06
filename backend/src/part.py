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

    def __init__(self):
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


class PurchasedPart(Part):
    """
    A purchased part. Extends Part.
    """

    def __init__(self):
        super().__init__()


class ManufacturedPart(Part):
    """
    A manufactured part. Extends Part.
    """

    def __init__(self):
        super().__init__()
        self.stock = stock.Stock(material.Material(), 0, 0)
        self.manufacturing_status = status.ToDoStatus()
        self.manufacturing_priority = priority.ThisYearPriority()
        self.machines_and_processes = ""
        self.cad_link = ""
        self.dwg_link = ""


class Part(Model):
    """
    An abstract part that extends Model.
    """

    collection = client.parts.parts

    def __init__():
        self.name = ""
        self.subsystem = ""
        self.subassembly = ""
        self.quantity_gonogo = 0
        self.quantity_competition = 0
        self.quantity_available = 0
        self.ordering_status = ""
        self.ordering_priority = ""
        self.vendor = ""
        self.vendor_cost = 0
        self.vendor_link = ""

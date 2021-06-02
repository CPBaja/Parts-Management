from model import Model
from part import Part

Part.collection = Model.client.test.main


def test_save_reload_delete():
    part = Part()
    part.save()
    part.reload()
    part.delete()

    part = Part.find_by_id("60b571adcfc314e2b0f2274a")
    part.save()

    part = Part()
    part.reload()
    part.delete()


def test_get_subclasses():
    json = {
        "_id": "60b571adcfc314e2b0f2274a",
        "_type": "ManufacturedPart",
        "name": "Intermediate Gear",
        "subsystem": "Powertrain",
        "subassembly": "Gearbox",
        "quantity_gonogo": 1,
        "quantity_competition": 4,
        "quantity_available": 4,
        "ordering_status": {"_type": "ToDoStatus"},
        "ordering_priority": {"_type": "ThisMonthPriority"},
        "vendor": "",
        "vendor_cost": 0,
        "vendor_link": "",
        "notes": "",
        "idn": "9001",
        "stock": {"_type": "Stock",
                  "material": {"_type": "Material"},
                  "quantity": 0, "length": 0},
        "manufacturing_status": {"_type": "ToDoStatus"},
        "manufacturing_priority": {"_type": "ThisYearPriority"},
        "machines_and_processes": "",
        "cad_link": "",
        "dwg_link": "",
    }

    part = Part.from_json(json)


def test_find_by_id():
    expected = {
        "_id": "60b571adcfc314e2b0f2274a",
        "_type": "ManufacturedPart",
        "name": "Intermediate Gear",
        "subsystem": "Powertrain",
        "subassembly": "Gearbox",
        "quantity_gonogo": 1,
        "quantity_competition": 4,
        "quantity_available": 4,
        "ordering_status": {"_type": "ToDoStatus"},
        "ordering_priority": {"_type": "ThisMonthPriority"},
        "vendor": "",
        "vendor_cost": 0,
        "vendor_link": "",
        "notes": "",
        "idn": "9001",
        "stock": {"_type": "Stock",
                  "material": {"_type": "Material"},
                  "quantity": 0, "length": 0},
        "manufacturing_status": {"_type": "ToDoStatus"},
        "manufacturing_priority": {"_type": "ThisYearPriority"},
        "machines_and_processes": "",
        "cad_link": "",
        "dwg_link": "",
    }

    assert Part.find_by_id("60b571adcfc314e2b0f2274a") == expected

import pytest
from part import Part


def test_part_find_by_id_success():
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

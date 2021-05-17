import pytest
from bson import ObjectId


from part import Part


def test_part_find_by_id_success():
    expected = {'name': 'Intermediate Gear',
                'subsystem': 'Powertrain',
                'subassembly': 'Gearbox',
                'quantity_gonogo': 1,
                'quantity_competition': 4,
                'quantity_available': 4,
                'ordering_status': '',
                'ordering_priority':
                'This Month',
                'vendor': '',
                'vendor_cost': 0,
                'vendor_link': '',
                'notes': '',
                '_id': ObjectId('6094ceed3a6a39621d3391e0'), 'idn': 90001}

    assert Part.find_by_id("6094ceed3a6a39621d3391e0") == expected

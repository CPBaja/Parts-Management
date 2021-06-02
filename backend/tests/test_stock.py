import stock
from material import Material


def test_init():
    stock.Stock(Material(), 0, 0)
    stock.SheetStock(Material(), 0, 0, 0, 0)
    stock.PlateStock(Material(), 0, 0, 0, 0)
    stock.BarStock(Material(), 0, 0, 0, 0)
    stock.RoundStock(Material(), 0, 0, 0)
    stock.RectTubeStock(Material(), 0, 0, 0, 0, 0)
    stock.RoundTubeStock(Material(), 0, 0, 0, 0)

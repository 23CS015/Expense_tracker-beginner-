from pydantic import BaseModel
from typing import Optional, Literal

class ExpenseIn(BaseModel):
    amount : float
    category: Literal[
        "Groceries",
        "Leisure",
        "Electronics",
        "Utilities",
        "Clothing",
        "Health",
        "Others"
    ]
    payment_method: Literal[
        "Cash",
        "UPI/Debit Card",
        "Credit Card"
    ]
    description: Optional[str] = None

class Expense(ExpenseIn):
    id : int







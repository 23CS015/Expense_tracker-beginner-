from fastapi import FastAPI
from exptracker_api.routers.expense import router as expense_router
app = FastAPI()

app.include_router(expense_router)

@app.get('/')
async def root():
    return {"message" : "API working"}




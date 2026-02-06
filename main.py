from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/favicon.ico")
async def favicon():
    return FileResponse("static/favicon.ico")

@app.get("/", response_class=HTMLResponse)
async def root():
    with open("static/index.html") as f:
        return f.read()

@app.get("/get_level/{level}")
async def get_level(level: int):
    # For now, return a static range; adjust based on your game logic
    return {"multiplier_range": [1, 10]}

@app.post("/submit_score/")
async def submit_score(data: dict):
    # For now, just return success; add database logic if needed
    return {"status": "success"}

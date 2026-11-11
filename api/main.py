# web layer/the acc api 
import logging, os, time
from typing import Annotated 

from dotenv import load_dotenv 

load_dotenv() # must run b4 importing modules that read env vars at import time (judges.py)

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from judges import judge_pitch 
from schemas import FullResult, Pitch 

from auth import CurrentUser, get_current_user

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("unicornt")

app = FastAPI(title="Unicornt API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/api/judge", response_model=FullResult, response_model_exclude_none=True)
async def judge(pitch: Pitch) -> FullResult:
    start = time.perf_counter()
    try:
        result = await judge_pitch(pitch)
    except Exception:
        log.exception("judging failed")
        raise HTTPException(status_code=502, detail="The judges were out to lunch. Try again.")
    log.info("Judged in %.2fs", time.perf_counter() - start)
    return result

@app.get("/api/me", response_model=CurrentUser)
def me(user: Annotated[CurrentUser, Depends(get_current_user)]) -> CurrentUser:
    return user
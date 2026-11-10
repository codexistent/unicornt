# api contract/describes what goes over the wire between back end and front end
from typing import Literal 

from pydantic import BaseModel, ConfigDict, Field 
from pydantic.alias_generators import to_camel

class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

Verdict = Literal["unicorn", "unicornt"]

class Pitch(CamelModel):
    company_name: str = Field(min_length = 1, max_length = 50)
    text: str = Field(min_length = 1, max_length = 280)

class JudgeResult(CamelModel):
    judge_name: str
    feedback: str
    score: int 

class FullResult(CamelModel):
    judge_results: list[JudgeResult]
    total_score: int
    verdict: Verdict 
    pitch_id: str | None = None 

class JudgeOutput(BaseModel):
    feedback: str 
    score: int
# database tables/describes whats stored in db
from datetime import datetime
from typing import Literal 

from pydantic import BaseModel, ConfigDict, Field, computed_field 
from pydantic.alias_generators import to_camel

UNICORN_THRESHOLD = 24 

Verdict = Literal["unicorn", "unicornt"]

class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

class Pitch(CamelModel):
    company_name: str = Field(min_length = 1, max_length = 50)
    text: str = Field(min_length = 1, max_length = 280)

class JudgeResult(CamelModel):
    judge_name: str
    feedback: str
    score: int = Field(ge = 1, le = 10)

class FullResult(CamelModel):
    judge_results: list[JudgeResult]
    pitch_id: str | None = None 

    @computed_field(alias="totalScore")
    @property 
    def total_score(self) -> int: 
        return sum(j.score for j in self.judge_results)

    @computed_field(alias="verdict")
    @property 
    def verdict(self) -> Verdict:
        return "unicorn" if self.total_score >= UNICORN_THRESHOLD else "unicornt"


class LeaderboardEntry(CamelModel):
    pitch: Pitch 
    pitch_id: str
    total_score: int 
    verdict: Verdict 
    github_username: str 
    avatar_url: str
    creation_time: datetime # auto seralized as ISO 8601 string

class JudgeOutput(BaseModel):
    feedback: str
    score: int
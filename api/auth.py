# figures out who is making a request, using the supabase token
import os
from typing import Annotated

from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from schemas import CamelModel

from supabase import AuthApiError, Client, create_client

# one client for the whole app, created once at import time (same pattern as Gemini)
supabase_client: Client = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_KEY"])

bearer_scheme = HTTPBearer(auto_error=False)

class CurrentUser(CamelModel):
    id: str 
    github_username: str 
    avatar_url: str | None = None 

def _unauthorized(detail: str) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=detail,
        headers={"WWW-Authenticate":"Bearer"},
    )

# temp
import logging

log = logging.getLogger("unicornt.auth")
#temp

def get_optional_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
) -> CurrentUser | None:
    if credentials is None:
        return None 

    try:
        response = supabase_client.auth.get_user(credentials.credentials)
    except AuthApiError as error:
        raise _unauthorized("Your session has expired. Sign in again") from None 

    user = response.user if response else None
    if user is None:
        raise _unauthorized("Your session has expired. Sign in again")

    metadata = user.user_metadata or {}
    return CurrentUser(
        id = user.id,
        github_username=metadata.get("user_name") or metadata.get("preferred_username") or "unknown",
        avatar_url=metadata.get("avatar_url")
    )

def get_current_user(
    user: Annotated[CurrentUser | None, Depends(get_optional_user)],
) -> CurrentUser:
    if user is None:
        raise _unauthorized("Sign in to do that.")

    return user
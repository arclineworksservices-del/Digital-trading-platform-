# Python Agent Scaffold

This repository contains a basic Python agent scaffold that supports registering functions and invoking them via a simple HTTP API.

Branch: feature/python-agent (created after initial commit)

What I will add on the feature/python-agent branch:

- agent/registry.py — function registry and decorator
- agent/functions.py — example functions (calculate_trade, fetch_market_data)
- agent/server.py — FastAPI app exposing endpoints to list and invoke functions
- agent/cli.py — a small CLI to invoke functions locally
- requirements.txt — dependencies
- tests/test_registry.py — unit tests for registry
- tests/test_server.py — integration tests for the FastAPI app
- .gitignore

How to run (after switching to the branch and installing deps):

1. python -m venv .venv
2. source .venv/bin/activate  # or .venv\Scripts\activate on Windows
3. pip install -r requirements.txt
4. uvicorn agent.server:app --reload

Invoke example:

POST http://localhost:8000/invoke
Body:
{
  "name": "calculate_trade",
  "args": {"quantity": 10, "entry": 100.0, "exit": 110.0, "side": "long"}
}

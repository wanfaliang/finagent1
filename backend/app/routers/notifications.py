from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter()

# List to store active connections
active_connections: List[WebSocket] = []

# WebSocket manager
async def connect_websocket(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)

async def disconnect_websocket(websocket: WebSocket):
    active_connections.remove(websocket)

async def send_notification(message: str):
    for connection in active_connections:
        await connection.send_text(message)

@router.websocket("/ws/notifications")
async def websocket_endpoint(websocket: WebSocket):
    await connect_websocket(websocket)
    try:
        while True:
            await websocket.receive_text()  # Wait for messages from client (ping-pong)
    except WebSocketDisconnect:
        await disconnect_websocket(websocket)

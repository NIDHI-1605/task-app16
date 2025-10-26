from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, SessionLocal
from app.models.task import Base, Task
from app.schemas.task import TaskCreate, TaskOut, TaskUpdate
from app.crud.task import get_tasks, get_task, create_task, update_task, delete_task

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production: restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/v1/tasks", response_model=list[TaskOut])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_tasks(db, skip=skip, limit=limit)

@app.get("/api/v1/tasks/{task_id}", response_model=TaskOut)
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = get_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.post("/api/v1/tasks", response_model=TaskOut)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)

@app.put("/api/v1/tasks/{task_id}", response_model=TaskOut)
def update_existing_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    db_task = get_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_task(db, db_task, task_update)

@app.delete("/api/v1/tasks/{task_id}", status_code=204)
def delete_task_by_id(task_id: int, db: Session = Depends(get_db)):
    db_task = get_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    delete_task(db, db_task)

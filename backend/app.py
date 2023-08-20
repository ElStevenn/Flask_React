from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import select, create_engine, ForeignKey, types, Integer, Column, String, MetaData, Date, DateTime
from sqlalchemy.ext.asyncio import create_async_engine,  AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import asyncio, uuid, aiofiles
from datetime import datetime, date

"""
First of all, I create an async table calles 'task_list_table'  where I save all 
data. (not order)
"""
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

DATABASE_URL = "sqlite+aiosqlite:///databases/database.db"
engine = create_async_engine(DATABASE_URL, echo=True)

# Async session maker for the engine
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()


class Task_list_table(Base):
    __tablename__ = "Task_list_table"

    ID = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    Title = Column(String(55), nullable=False)
    Text = Column(String(3000), nullable=False)
    DeadLine = Column(DateTime, nullable=False)
    Start_Day = Column(Date)

    def __repr__(self):
        return f"{self.Title}"

async def write_task_to_file_txt(task):
    async with aiofiles.open("task.txt", "w") as f:
        await f.write(f"{task['title']}, {task['text']}, {task['deadline']}, {task['start_day']}")


@app.route('/')
def main():
    return "<h1>Server is runing!</h1>"

@app.route('/get_task_and_ddbb', methods=['POST'])
async def insert_database():
    """Insert a task into the database."""
    data = request.json

    start_date_provided = False

    # Parsing start_day
    if 'start_day' in data and data['start_day']:
        start_date_provided = True
        start_year, start_month, start_day_num = map(int, data['start_day'].split('-'))

    # Parsing DeadLine
    date_part, time_part = data['deadline'].split('T')
    year, month, day = map(int, date_part.split('-'))
    hour, minute = map(int, time_part.split(':'))

    new_task = Task_list_table(
        Title=data['title'],
        Text=data['text'],
        DeadLine=datetime(year, month, day, hour=hour, minute=minute),
        Start_Day=date(start_year, start_month, start_day_num) if start_date_provided else None
    )

    async with AsyncSessionLocal() as session:
        session.add(new_task)
        try:
            await session.commit()  # Try to commit
            return jsonify({"Result": f"Task called '{data['title']}' registered successfully!"})

        except Exception as e:
            print(str(e))
            return jsonify({"Error": "Failed to process the request"})


@app.route('/get_all_taks/')
@app.route('/get_all_taks/<string:apiKey>')
async def get_data(apiKey = None):
    if apiKey == "12345" or apiKey == "abcde":
        async with AsyncSessionLocal() as session:
            try:
                # Use select from SQLAlchemy to feth all tasks
                stmt = select(Task_list_table)
                result = await session.execute(stmt)
                tasks = result.scalars().all()

                # Convert ORM objects o dictionaries for JSON response
                tasks_list = [{
                    "ID": task.ID,
                    "Title": task.Title,
                    "Text": task.Text,
                    "DeadLine": task.DeadLine.isoformat() if task.DeadLine else None,
                    "Start_Day": task.Start_Day.isoformat() if task.Start_Day else None 
                } for task in tasks]

                return jsonify({"Response": tasks_list})
            
            except Exception as e:
                print(e)
                return jsonify({"Error":e})
            
    return jsonify({"Error":"You must introduce a correct API Key to get this data!"})

    
async def init_db():
    """Init the database with this async function"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == '__main__':
    asyncio.run(init_db())
    app.run(debug=True)














































"""
async def get_email_users():
    async with engine.begin() as conn:
        result = await conn.execute(select(MiniTable))
        await conn.run_sync()
        return result

async def save_user_email(user,email):
    '''This function I just save the user and email'''
    async with open("myFile", "w") as f:
        await f.write(f"{user} - {email}")


@app.route('/test')
def test():
    return jsonify({"Name":"Mr Potatoe!"})



@app.route('/show_emails_users')
async def showEmails():
    async def get_emails():
        emails = await get_email_users()
        return emails
    
    result = asyncio.gather(get_emails())

    return f"<p>{result}</p>"


    


@app.route("/receive", methods=['POST'])
async def receive_data():
    data = request.json
    new_user = MiniTable(Name=data['name'], Email=data['email'])


    async with AsyncSessionLocal() as session:  # Asynchronous session
        session.add(new_user)
        try:
            await session.commit()  # Commit the changes asynchronously
            return jsonify({"Message": f"Data received! {data['name']}, {data['email']}"})
        except Exception as e:
            await session.rollback()  # Rollback if there's an error
            return jsonify({"Error": str(e)})

"""  




"""Diferents HTTP methods
# GET
# POST
# PUT
# DELETE


Task Manager

Add, edit, or delete tasks.
Categorize tasks or set due dates.
"""



    
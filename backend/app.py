from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import select, create_engine, ForeignKey, types, Integer, Column, String, MetaData
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import asyncio, uuid

# This is the server, where i have to provide the data to REACT, and there, yes, i just have to try to get all the data
# As you see, here we doesn't have render_template to html response, we have jsonfy, that's the data that we are sending to frond end

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

DATABASE_URL = "sqlite+aiosqlite:///project.db"
engine = create_async_engine(DATABASE_URL, echo=True)

# Async session maker for the engine
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()


class MiniTable(Base):
    __tablename__ = "MiniTable"

    ID = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    Name = Column(String, nullable=False)
    Email = Column(String, nullable=False)

    def __repr__(self):
        return f"{self.Name}"

async def get_email_users():
    async with engine.begin() as conn:
        result = await conn.execute(select(MiniTable))
        await conn.run_sync()
        return result

async def save_user_email(user,email):
    """This function I just save the user and email"""
    async with open("myFile", "w") as f:
        await f.write(f"{user} - {email}")

@app.route('/')
def main():
    return "<h1>It actually works!</h1>"

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

    




"""Diferents HTTP methods
# GET
# POST
# PUT
# DELETE


Task Manager

Add, edit, or delete tasks.
Categorize tasks or set due dates.
"""

async def init_db():
    """Init the database with this async function"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

if __name__ == '__main__':
    asyncio.run(init_db())
    app.run(debug=True)

    
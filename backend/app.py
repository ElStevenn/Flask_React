from flask import Flask, render_template, jsonify
import asyncio
import aiohttp

app = Flask(__name__)

# This is the server, where i have to provide the data to REACT, and there, yes, i just have to try to get all the data
# As you see, here we doesn't have render_template to html response, we have jsonfy, that's the data that we are sending to frond end

async def fetch_that(url):
    async with aiohttp.ClientSession() as client:
        async with client.get(url) as response:
            Data = await response.json()
            return Data['args']['text']


@app.route('/')
def main():
    return "<h1>It actually works!</h1>"


@app.route('/seeword')
async def SeeWord():
    urls = ["http://httpbin.org/get?text=python","http://httpbin.org/get?text=is","http://httpbin.org/get?text=fun"]

    async def get_data(url):
        data = await fetch_that(url)
        return data

    tasks = [get_data(url) for url in urls]
    results = await asyncio.gather(*tasks)
   

    # Rember that jsonfy is used to combert python dictionaries to JSON
    return jsonify(results)




@app.route('/seedata')
async def seedata():
    YourData = {
        "Name":"Pau",
        "Surname": "Mateu",
        "Age": 20,
        "Contry": "Spain",
        "City": "Barcelona"
    }
    
    return jsonify(YourData)



if __name__ == '__main__':
    app.run(debug=True)
    
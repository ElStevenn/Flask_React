from bs4 import BeautifulSoup
import requests
import concurrent.futures
import functools

year = "2016"
URL_BASE = f"https://resultados.elpais.com/elecciones/{year}/generales/congreso/"
posible_provices = [i for i in range(1, 55)]

def prefix_zero(num):
    if 1 <= num <= 9:
        return f"0{num}"
    else:
        return num

def seach_provice_id(i, region_id):
    url = URL_BASE + f"{region_id}/{prefix_zero(i)}.html"
    Data = requests.get(url)
    if Data.status_code == 200:
        return i
    else:
        return None

def scrapt_provinces_ID(region_id):
    Provice_id = [region_id]
    search_provice_partial = functools.partial(seach_provice_id, region_id=region_id)

    # Verify how many provinces have
    with concurrent.futures.ThreadPoolExecutor() as executor:
        r = executor.map(search_provice_partial, posible_provices)

        # Collect the results in Provice_id
        for result in r:
            if result is not None:
                Provice_id.append(result)

    return Provice_id if Provice_id else None 


def Scrapt_province():

    for i in range(21):
        comunity = scrapt_provinces_ID(prefix_zero(i))
        if len(comunity) >= 2:
            print(comunity)
            for province_id in comunity[1:]:

                soup = requests.get(URL_BASE + f"{prefix_zero(i)}/{province_id}.html")
                HTMLdata = BeautifulSoup(soup.content, "html.parser")
                
                

                Name = HTMLdata.find_all("h1")
                
                print(Name)
        
Scrapt_province()

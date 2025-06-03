import sys
import requests


filename = input("filename=")

line = "https://costmanager-8r4x.onrender.com"

output = open(filename,"w")

sys.stdout = output

print(line)

print()


print("testing getting the about")

print("-------------------------")

try:

  text = ""

  #getting details of team manager

  url = line + "/api/about/"

  data = requests.get(url)

  print("url="+url)

  print("data.status_code="+str(data.status_code))

  print(data.content)

  print("data.text="+data.text)

  print(data.json())

except Exception as e:

  print("problem")

  print(e)

print("")


print()

print("testing getting the report - 1")

print("------------------------------")

try:

  text = ""

  #getting the report

  url = line + "/api/report/?id=123123&year=2025&month=6"

  data = requests.get(url)

  print("url="+url)

  print("data.status_code="+str(data.status_code))

  print(data.content)

  print("data.text="+data.text)

  print(text)

except Exception as e:

  print("problem")

  print(e)

print("")


print()

print("testing adding cost item")

print("----------------------------------")

try:

  text = ""

  url = line + "/api/add/"

  data = requests.post(url,
        json={'userid':123123, 'description':'milk 9','category':'food','sum':8})

  print("url="+url)

  print("data.status_code="+str(data.status_code))

  print(data.content)

except Exception as e:

  print("problem")

  print(e)

print("")


print()

print("testing getting the report - 2")

print("------------------------------")

try:

  text = ""

  #getting the report

  url = line + "/api/report/?id=123123&year=2025&month=6"

  data = requests.get(url)

  print("url="+url)

  print("data.status_code="+str(data.status_code))

  print(data.content)

  print("data.text="+data.text)

  print(text)

except Exception as e:

  print("problem")

  print(e)

print("")


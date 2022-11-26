import requests

API_ENDPOINT = 'http://localhost:4000/api/users'
USER_ENDPOINT = 'http://localhost:4000/api/getAllUsersId'
r = requests.get(USER_ENDPOINT).json()['data']
for user_id in r:
    url = API_ENDPOINT+'/'+user_id
    print(url)
    req = requests.delete(url)
    
print('deleted all users in the db')
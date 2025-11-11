from notion_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

print("Searching for databases...\n")

# Search for databases
response = client.search(filter={"property": "object", "value": "database"})

databases = []
for db in response['results']:
    title_prop = db.get('title', [])
    if title_prop:
        title = title_prop[0].get('plain_text', '') if title_prop else 'Untitled'
        db_id = db['id']
        url = db.get('url', '')
        
        databases.append({
            'title': title,
            'id': db_id,
            'url': url
        })

print(f"Found {len(databases)} databases:\n")
for db in databases[:20]:
    print(f"🗄️  {db['title']}")
    print(f"   ID: {db['id']}")
    print(f"   URL: {db['url']}\n")
    

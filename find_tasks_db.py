from notion_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

# Search for all pages
response = client.search()

print("Looking for Tasks database...\n")

for result in response['results']:
    obj_type = result.get('object')
    
    # Check title
    title = "Untitled"
    if 'properties' in result and 'title' in result['properties']:
        title_prop = result['properties']['title']
        if 'title' in title_prop and title_prop['title']:
            title = title_prop['title'][0].get('plain_text', 'Untitled')
    elif 'title' in result and result['title']:
        title = result['title'][0].get('plain_text', 'Untitled')
    
    # Look for Tasks
    if 'task' in title.lower():
        print(f"📋 Found: {title}")
        print(f"   Type: {obj_type}")
        print(f"   ID: {result['id']}")
        print(f"   URL: {result.get('url', 'No URL')}\n")
        
        # If it's a database, get its properties
        if obj_type == 'database':
            try:
                db = client.databases.retrieve(database_id=result['id'])
                print("   Properties:")
                for prop_name, prop_info in db['properties'].items():
                    prop_type = prop_info.get('type', 'unknown')
                    print(f"     • {prop_name}: {prop_type}")
                print()
            except Exception as e:
                print(f"   Error: {e}\n")

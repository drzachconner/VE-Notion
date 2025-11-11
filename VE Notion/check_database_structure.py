from notion_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

# Search for Tasks database
response = client.search(query="Tasks", filter={"property": "object", "value": "page"})

for result in response['results']:
    if result.get('object') == 'database' or 'database' in str(result):
        props = result.get('properties', {})
        title_prop = result.get('title', [])
        if title_prop:
            title = title_prop[0].get('plain_text', '')
            if 'task' in title.lower():
                db_id = result['id']
                print(f"Found Tasks Database: {title}")
                print(f"ID: {db_id}\n")
                
                # Get database to see properties
                try:
                    db = client.databases.retrieve(database_id=db_id)
                    print("Properties:")
                    for prop_name, prop_info in db['properties'].items():
                        prop_type = prop_info.get('type', 'unknown')
                        print(f"  - {prop_name}: {prop_type}")
                        
                        # If it's a select or multi-select, show options
                        if prop_type in ['select', 'multi_select']:
                            options = prop_info.get(prop_type, {}).get('options', [])
                            if options:
                                print(f"    Options: {[opt['name'] for opt in options]}")
                except Exception as e:
                    print(f"Error retrieving database details: {e}")
                
                break

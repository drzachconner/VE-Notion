from notion_client import Client
import os
from dotenv import load_dotenv
import json

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

tasks_db_id = "2a280ff9-d4f5-814a-8c35-000b60368c66"

try:
    db = client.databases.retrieve(database_id=tasks_db_id)
    
    print("✅ Tasks Database Properties:\n")
    for prop_name, prop_info in db['properties'].items():
        prop_type = prop_info.get('type', 'unknown')
        print(f"  📌 {prop_name}")
        print(f"     Type: {prop_type}")
        
        # Show options for select/multi-select
        if prop_type in ['select', 'multi_select']:
            options = prop_info.get(prop_type, {}).get('options', [])
            if options:
                option_names = [opt['name'] for opt in options]
                print(f"     Options: {', '.join(option_names)}")
        
        print()
        
except Exception as e:
    print(f"Error: {e}")

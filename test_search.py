from notion_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

try:
    # Search for pages
    response = client.search(filter={"property": "object", "value": "page"})
    print(f"✓ Found {len(response['results'])} pages your integration can access:")
    for page in response['results'][:5]:
        title = page.get('properties', {}).get('title', {})
        if title:
            print(f"  - {title}")
        else:
            print(f"  - Page ID: {page['id']}")
    
    if len(response['results']) == 0:
        print("\n⚠️  No pages found! Your integration needs to be connected to pages.")
        print("\nPlease share pages with your integration:")
        print("1. Open page in Notion")
        print("2. Click '...' → 'Add connections'")
        print("3. Select your integration")
        
except Exception as e:
    print(f"✗ Error: {e}")

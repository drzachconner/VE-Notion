from notion_client import Client
import os
from dotenv import load_dotenv

load_dotenv()
client = Client(auth=os.getenv('NOTION_API_KEY'))

# Search for relevant pages
search_terms = ["Van Every", "Dashboard", "Dr. Zach", "Dr. Saylor", "Dr. John", "Lou Ann", "Christina", "Tricia", "Windy", "Project Tracker", "Mastermind"]

print("Searching for relevant pages...\n")

response = client.search(filter={"property": "object", "value": "page"})

found_pages = []
for page in response['results']:
    # Try to get the title
    props = page.get('properties', {})
    title_prop = props.get('title', {})
    
    if title_prop and 'title' in title_prop:
        title_array = title_prop['title']
        if title_array:
            title = title_array[0].get('plain_text', '')
            page_id = page['id']
            url = page.get('url', '')
            
            # Check if any search term matches
            if any(term.lower() in title.lower() for term in search_terms):
                found_pages.append({
                    'title': title,
                    'id': page_id,
                    'url': url
                })

print(f"Found {len(found_pages)} relevant pages:\n")
for p in found_pages[:20]:  # Show first 20
    print(f"📄 {p['title']}")
    print(f"   ID: {p['id']}")
    print(f"   URL: {p['url']}\n")
    

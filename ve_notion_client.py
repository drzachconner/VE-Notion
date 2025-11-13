"""
Notion API Client for Van Every Chiropractic Mastermind Dashboard
"""

import os
import json
from typing import Dict, List, Any, Optional
from notion_client import Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class NotionDashboardClient:
    """Client for interacting with Notion API to build and manage dashboards."""

    def __init__(self, api_key: Optional[str] = None):
        """Initialize the Notion client."""
        self.api_key = api_key or os.getenv('NOTION_API_KEY')
        if not self.api_key:
            raise ValueError(
                "Notion API key not found. Please set NOTION_API_KEY in .env file"
            )

        self.client = Client(auth=self.api_key)

        # Load configuration
        with open('config.json', 'r') as f:
            self.config = json.load(f)

    def get_page(self, page_id: str) -> Dict[str, Any]:
        """Retrieve a Notion page."""
        try:
            return self.client.pages.retrieve(page_id=page_id)
        except Exception as e:
            print(f"Error retrieving page {page_id}: {e}")
            raise

    def get_block_children(self, block_id: str) -> List[Dict[str, Any]]:
        """Retrieve all children of a block."""
        try:
            results = []
            has_more = True
            start_cursor = None

            while has_more:
                response = self.client.blocks.children.list(
                    block_id=block_id,
                    start_cursor=start_cursor
                )
                results.extend(response['results'])
                has_more = response['has_more']
                start_cursor = response.get('next_cursor')

            return results
        except Exception as e:
            print(f"Error retrieving blocks for {block_id}: {e}")
            raise

    def append_blocks(self, page_id: str, blocks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Append blocks to a page."""
        try:
            return self.client.blocks.children.append(
                block_id=page_id,
                children=blocks
            )
        except Exception as e:
            print(f"Error appending blocks to {page_id}: {e}")
            raise

    def update_page(self, page_id: str, properties: Dict[str, Any] = None,
                   icon: Dict[str, Any] = None, cover: Dict[str, Any] = None) -> Dict[str, Any]:
        """Update page properties."""
        try:
            params = {'page_id': page_id}
            if properties:
                params['properties'] = properties
            if icon:
                params['icon'] = icon
            if cover:
                params['cover'] = cover

            return self.client.pages.update(**params)
        except Exception as e:
            print(f"Error updating page {page_id}: {e}")
            raise

    def delete_all_blocks(self, page_id: str):
        """Delete all blocks from a page (used to clear existing content)."""
        try:
            blocks = self.get_block_children(page_id)
            for block in blocks:
                self.client.blocks.delete(block_id=block['id'])
            print(f"Cleared {len(blocks)} blocks from page {page_id}")
        except Exception as e:
            print(f"Error deleting blocks from {page_id}: {e}")
            raise

    def get_database(self, database_id: str) -> Dict[str, Any]:
        """Retrieve database information."""
        try:
            return self.client.databases.retrieve(database_id=database_id)
        except Exception as e:
            print(f"Error retrieving database {database_id}: {e}")
            raise


if __name__ == "__main__":
    # Test the client
    try:
        client = NotionDashboardClient()
        print("✓ Notion client initialized successfully")

        # Test by retrieving the project tracker
        tracker_id = client.config['notion_pages']['project_tracker']
        print(f"Testing connection by retrieving project tracker...")
        page = client.get_page(tracker_id)
        print(f"✓ Successfully retrieved page: {page.get('url', 'Unknown')}")

    except Exception as e:
        print(f"✗ Error: {e}")

"""
Dashboard Block Templates for Individual Team Member Dashboards
Based on Dr. Zach's prototype structure
"""

from typing import Dict, List, Any


class DashboardBlockBuilder:
    """Build Notion blocks for individual dashboards following Dr. Zach's prototype."""

    @staticmethod
    def create_heading_1(text: str, color: str = "default") -> Dict[str, Any]:
        """Create a heading 1 block."""
        return {
            "object": "block",
            "type": "heading_1",
            "heading_1": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text}
                }],
                "color": color
            }
        }

    @staticmethod
    def create_heading_2(text: str, color: str = "default") -> Dict[str, Any]:
        """Create a heading 2 block."""
        return {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text}
                }],
                "color": color
            }
        }

    @staticmethod
    def create_heading_3(text: str, color: str = "default") -> Dict[str, Any]:
        """Create a heading 3 block."""
        return {
            "object": "block",
            "type": "heading_3",
            "heading_3": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text}
                }],
                "color": color
            }
        }

    @staticmethod
    def create_divider() -> Dict[str, Any]:
        """Create a divider block."""
        return {
            "object": "block",
            "type": "divider",
            "divider": {}
        }

    @staticmethod
    def create_callout(text: str, icon: str = "💡", color: str = "gray_background") -> Dict[str, Any]:
        """Create a callout block."""
        return {
            "object": "block",
            "type": "callout",
            "callout": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text}
                }],
                "icon": {
                    "type": "emoji",
                    "emoji": icon
                },
                "color": color
            }
        }

    @staticmethod
    def create_column_list(columns: List[List[Dict[str, Any]]]) -> Dict[str, Any]:
        """Create a column list with multiple columns."""
        return {
            "object": "block",
            "type": "column_list",
            "column_list": {},
        }

    @staticmethod
    def create_column(blocks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Create a column block."""
        return {
            "object": "block",
            "type": "column",
            "column": {
                "children": blocks
            }
        }

    @staticmethod
    def create_toggle(title: str, children: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Create a toggle block."""
        block = {
            "object": "block",
            "type": "toggle",
            "toggle": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": title}
                }],
                "color": "default"
            }
        }
        if children:
            block["toggle"]["children"] = children
        return block

    @staticmethod
    def create_bullet_list_item(text: str, children: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Create a bullet list item."""
        block = {
            "object": "block",
            "type": "bulleted_list_item",
            "bulleted_list_item": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text}
                }],
                "color": "default"
            }
        }
        if children:
            block["bulleted_list_item"]["children"] = children
        return block

    @staticmethod
    def create_paragraph(text: str, bold: bool = False, italic: bool = False, color: str = "default") -> Dict[str, Any]:
        """Create a paragraph block."""
        annotations = {
            "bold": bold,
            "italic": italic
        }
        return {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text},
                    "annotations": annotations
                }],
                "color": color
            }
        }

    @staticmethod
    def create_link_to_page(page_id: str, title: str) -> Dict[str, Any]:
        """Create a link to page block."""
        return {
            "object": "block",
            "type": "link_to_page",
            "link_to_page": {
                "type": "page_id",
                "page_id": page_id
            }
        }

    @staticmethod
    def create_quote(text: str, color: str = "default") -> Dict[str, Any]:
        """Create a quote block."""
        return {
            "object": "block",
            "type": "quote",
            "quote": {
                "rich_text": [{
                    "type": "text",
                    "text": {"content": text}
                }],
                "color": color
            }
        }

    @classmethod
    def build_dashboard_structure(cls, member_name: str, member_icon: str) -> List[Dict[str, Any]]:
        """
        Build the complete dashboard structure based on Dr. Zach's prototype.

        Note: Linked database views CANNOT be created via API and must be added manually.
        This creates placeholders with instructions.
        """
        blocks = []

        # Hero Section
        blocks.append(cls.create_heading_1(f"{member_icon} {member_name}'s Dashboard", "blue_background"))
        blocks.append(cls.create_divider())

        # Today's Focus Section
        blocks.append(cls.create_heading_2("🎯 Today's Focus", "orange_background"))
        blocks.append(cls.create_callout(
            "Set your top 3 priorities for today. Focus on what matters most!",
            "⭐",
            "yellow_background"
        ))
        blocks.append(cls.create_bullet_list_item("Priority 1: [Add your first priority]"))
        blocks.append(cls.create_bullet_list_item("Priority 2: [Add your second priority]"))
        blocks.append(cls.create_bullet_list_item("Priority 3: [Add your third priority]"))
        blocks.append(cls.create_divider())

        # This Week at a Glance Section
        blocks.append(cls.create_heading_2("📊 This Week at a Glance", "blue_background"))
        blocks.append(cls.create_paragraph(
            "⚠️ NOTE: The 3 metric cards below need to be created manually in Notion as the API cannot create linked database views.",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_callout(
            "📋 Manual Step Required: Create 3 columns here with callout blocks showing:\n• Column 1: My Tasks (with count)\n• Column 2: My Meetings (with count)\n• Column 3: My Projects (with count)",
            "⚙️",
            "gray_background"
        ))
        blocks.append(cls.create_divider())

        # Performance Metrics Section
        blocks.append(cls.create_heading_2("📈 My Performance Metrics", "green_background"))
        blocks.append(cls.create_paragraph(
            "⚠️ NOTE: The 3 tracking cards below need to be created manually in Notion.",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_callout(
            "📋 Manual Step Required: Create 3 columns here with callout blocks for:\n• Column 1: Goals Progress\n• Column 2: Completed Tasks This Month\n• Column 3: Upcoming Milestones",
            "⚙️",
            "gray_background"
        ))
        blocks.append(cls.create_divider())

        # My Tasks Section
        blocks.append(cls.create_heading_2("✅ My Tasks", "red_background"))
        blocks.append(cls.create_callout(
            "📋 Manual Step Required: Add a linked database view of the Tasks database here, filtered to show only your tasks.",
            "⚙️",
            "gray_background"
        ))
        blocks.append(cls.create_paragraph(
            "To add the Tasks database view:\n1. Type '/linked' and select 'Create linked database'\n2. Search for 'Tasks' database\n3. Add filter: Assigned to → Contains → [Your Name]",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_divider())

        # My Meetings Section
        blocks.append(cls.create_heading_2("📅 My Meetings", "purple_background"))
        blocks.append(cls.create_callout(
            "📋 Manual Step Required: Add a linked database view of the Meetings database here, filtered to show only your meetings.",
            "⚙️",
            "gray_background"
        ))
        blocks.append(cls.create_paragraph(
            "To add the Meetings database view:\n1. Type '/linked' and select 'Create linked database'\n2. Search for 'Meetings' database\n3. Add filter: Attendees → Contains → [Your Name]",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_divider())

        # My Projects Section
        blocks.append(cls.create_heading_2("🎯 My Projects", "blue_background"))
        blocks.append(cls.create_callout(
            "📋 Manual Step Required: Add a linked database view of the Projects database here, filtered to show only your projects.",
            "⚙️",
            "gray_background"
        ))
        blocks.append(cls.create_paragraph(
            "To add the Projects database view:\n1. Type '/linked' and select 'Create linked database'\n2. Search for 'Projects' database\n3. Add filter: Team Members → Contains → [Your Name]",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_divider())

        # Quick Links Section
        blocks.append(cls.create_heading_2("🔗 Quick Links", "default"))
        blocks.append(cls.create_paragraph("Important resources and shortcuts:"))
        blocks.append(cls.create_bullet_list_item("📚 [Add link to Resources & Documents database]"))
        blocks.append(cls.create_bullet_list_item("🎯 [Add link to Business Goals database]"))
        blocks.append(cls.create_bullet_list_item("🏠 [Add link to Main Dashboard]"))
        blocks.append(cls.create_bullet_list_item("📊 [Add link to Databases Backend]"))

        return blocks


if __name__ == "__main__":
    # Test block generation
    builder = DashboardBlockBuilder()
    blocks = builder.build_dashboard_structure("Test User", "👤")
    print(f"Generated {len(blocks)} blocks for dashboard")
    print("\nFirst 3 blocks:")
    for i, block in enumerate(blocks[:3]):
        print(f"{i+1}. {block['type']}: {block}")

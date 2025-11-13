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
        Build clean dashboard structure for team member.
        
        Layout:
        1. Hero section with name
        2. Navigation (All Tasks | All Projects | All Events)
        3. My Tasks section (with link to All Tasks)
        4. My Events section (with link to Calendar)
        5. My Projects section (with link to All Projects)

        Note: Linked database views CANNOT be created via API and must be added manually.
        """
        blocks = []

        # Hero Section
        blocks.append(cls.create_heading_1(f"{member_icon} {member_name}'s Dashboard", "blue_background"))
        blocks.append(cls.create_divider())

        # Navigation Section (Always visible)
        blocks.append(cls.create_heading_3("☰ Navigation", "gray_background"))
        blocks.append(cls.create_paragraph(
            "📋 Manual Step: Add page links here → All Tasks | All Projects | All Events",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_divider())

        # 🗂️ My Tasks Section
        blocks.append(cls.create_heading_2("🗂️ My Tasks", "blue_background"))
        blocks.append(cls.create_paragraph(
            "📋 Manual Step: Add linked database view of Tasks here (Table view, filtered: Assigned to = " + member_name + ")",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_paragraph(
            "Show columns: Name | Due Date | Priority | Related Project | Status",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_paragraph("→ View All Tasks", bold=True))
        blocks.append(cls.create_divider())

        # 📅 My Events Section
        blocks.append(cls.create_heading_2("📅 My Events", "purple_background"))
        blocks.append(cls.create_paragraph(
            "📋 Manual Step: Add linked database view of Events/Meetings here (List view, filtered: Attendees = " + member_name + ")",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_paragraph(
            "Show upcoming events only (sorted by date ascending)",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_paragraph("→ View Calendar", bold=True))
        blocks.append(cls.create_divider())

        # 📊 My Projects Section
        blocks.append(cls.create_heading_2("📊 My Projects", "green_background"))
        blocks.append(cls.create_paragraph(
            "📋 Manual Step: Add linked database view of Projects here (Table view, filtered: Team Members = " + member_name + ")",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_paragraph(
            "Show columns: Name | Status | Related Tasks Count",
            italic=True,
            color="gray"
        ))
        blocks.append(cls.create_paragraph("→ View All Projects", bold=True))

        return blocks


if __name__ == "__main__":
    # Test block generation
    builder = DashboardBlockBuilder()
    blocks = builder.build_dashboard_structure("Test User", "👤")
    print(f"Generated {len(blocks)} blocks for dashboard")
    print("\nFirst 3 blocks:")
    for i, block in enumerate(blocks[:3]):
        print(f"{i+1}. {block['type']}: {block}")

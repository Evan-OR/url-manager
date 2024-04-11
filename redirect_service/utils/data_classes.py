from dataclasses import dataclass
from datetime import datetime
from bson import ObjectId


@dataclass
class LinkAnalytics:
    _id: ObjectId
    code: str
    original_url: str
    creator_email: str
    date_created: datetime
    title: str


@dataclass
class LinkData:
    _id: ObjectId
    code: str
    original_url: str
    creator_email: str
    date_created: datetime
    title: str

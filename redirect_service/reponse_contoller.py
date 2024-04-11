from azure.functions import HttpResponse, HttpRequest
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
from urllib import parse
from utils.data_classes import LinkData


class ResponseController:
    def __init__(self, client: MongoClient):
        self.client = client
        self.analytics = client.url_management.analytics

    def return_error(
        self, error_code: int, error_message: str, status_code: int
    ) -> HttpResponse:
        with open("templates/error.html", "r") as f:
            error_template = f.read()
            error_template = error_template.replace("--CODE--", str(error_code))
            error_template = error_template.replace("--MESSEGE--", error_message)

        return HttpResponse(
            error_template,
            mimetype="text/html",
            status_code=status_code,
        )

    def return_success(
        self, req: HttpRequest, original_url: str, link_data: LinkData, status_code: int
    ) -> HttpResponse:
        with open("templates/success.html", "r") as f:
            success_template = f.read()
            success_template = success_template.replace(
                "--ORIGINAL_URL--", original_url
            )

        return HttpResponse(
            success_template,
            mimetype="text/html",
            status_code=status_code,
        )

    def update_analytics(self, req: HttpRequest, link_data):
        header_referer = req.headers.get("referer")
        referer = parse.urlparse(header_referer).hostname

        result = self.analytics.update_one(
            {"url_data": ObjectId(link_data["_id"])},
            {
                "$push": {f"referer_data.{referer}": datetime.now()},
                "$inc": {"total_clicks": 1},
            },
            upsert=True,
        )

        if not result.acknowledged or result.modified_count != 1:
            raise ValueError(f"Failed to update analytics with id: {link_data}")

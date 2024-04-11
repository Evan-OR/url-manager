import azure.functions as func
import logging
import os

from dotenv import load_dotenv
from pymongo import MongoClient
from reponse_contoller import ResponseController

load_dotenv()

client = MongoClient(os.environ["MONGO_URL"])

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)


@app.route(route="redirect_service")
def redirect_service(req: func.HttpRequest) -> func.HttpResponse:
    try:
        logging.info("Python HTTP trigger function processed a request.")

        rc = ResponseController(client)

        code = req.params.get("code")
        if not code:
            return rc.return_error(
                error_code=400,
                error_message="No code parameter provided",
                status_code=400,
            )

        shortened_urls_collection = client.url_management.shortened_urls
        res: dict = shortened_urls_collection.find_one({"code": code})

        if res is None:
            return rc.return_error(
                error_code=400,
                error_message="Code not found",
                status_code=400,
            )

        original_url = res["original_url"]
        rc.update_analytics(req, res)

        return rc.return_success(
            req, original_url=original_url, link_data=res, status_code=200
        )

    except Exception as e:
        return "error idk", 500

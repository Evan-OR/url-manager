from azure.functions import HttpResponse


class ResponseController:
    def __init__(self):
        pass

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

    def return_success(self, original_url: str, status_code: int) -> HttpResponse:
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

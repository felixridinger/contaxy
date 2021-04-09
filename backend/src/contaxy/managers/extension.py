from typing import List, Optional, Tuple, Union

from contaxy import config
from contaxy.clients import DeploymentManagerClient, FileClient
from contaxy.clients.shared import BaseUrlSession
from contaxy.managers.deployment.manager import DeploymentManager
from contaxy.operations import ExtensionOperations
from contaxy.schema import ExtensibleOperations, Extension
from contaxy.schema.deployment import DeploymentType
from contaxy.schema.extension import CORE_EXTENSION_ID
from contaxy.utils.state_utils import GlobalState, RequestState

COMPOSITE_ID_SEPERATOR = "~"


def parse_composite_id(composite_id: str) -> Tuple[str, Union[str, None]]:
    """Extracts the resource and extension ID from an composite ID.

    If the provided ID does not contain an composite ID seperator (`~`)
    the ID will be returned as resource ID and the extension ID will be `None`.

    Args:
        composite_id (str): The ID to parse.

    Returns:
        Tuple[str, str]: Resource ID, Extension ID
    """
    # TODO: Only sperate based on the first occurance

    if COMPOSITE_ID_SEPERATOR not in composite_id:
        # The provided id does not contain an extension ID prefix
        return composite_id, None

    resource_id, extension_id = composite_id.split(COMPOSITE_ID_SEPERATOR, 1)
    return resource_id, extension_id


class ExtensionClient(FileClient, DeploymentManagerClient):
    """Handels the request forwarding to the installed extensions.

    The extension client implements all extensible manager interfaces
    and uses the generated HTTP client to forward requests to the respective extension.

    Extension clients are initialized and managed by the `ExtensionManager`.
    """

    def __init__(self, endpoint_url: str, access_token: Optional[str] = None):
        """Initializes the extension client.

        Args:
            endpoint_url: The endpoint base URL of the extension.
            access_token: An access token that is attached to all requests.
        """
        client_session = BaseUrlSession(base_url=endpoint_url)
        if access_token:
            client_session.headers.update({config.API_TOKEN_NAME: access_token})
            # client_session.cookies.set(config.API_TOKEN_NAME, access_token)
        super(ExtensionClient, self).__init__(client=client_session)


class ExtensionManager(ExtensionOperations):
    """Installs and manages extensions.

    The extension manager implements all methods for the full extension lifecycle.
    It is the central entry point for all interactions with extensions.
    """

    def __init__(
        self,
        global_state: GlobalState,
        request_state: RequestState,
        deployment_manager: DeploymentManager,
    ):
        """Initializes the extension manager.

        Args:
            global_state: The global state of the app instance.
            request_state: The state for the current request.
        """
        self.global_state = global_state
        self.request_state = request_state
        self.deployment_manager = deployment_manager

    def get_extension_client(self, extension_id: str) -> ExtensionClient:
        endpoint_url = f"http://{config.settings.SYSTEM_NAMESPACE}-{extension_id}:8080"
        access_token = (
            self.request_state.authorized_access.access_token.token
            if self.request_state.authorized_access
            and self.request_state.authorized_access.access_token
            else ""
        )
        return ExtensionClient(
            endpoint_url=endpoint_url,
            access_token=access_token,
        )

    def list_extensions(self, project_id: str) -> List[Extension]:
        project_services = self.deployment_manager.list_services(project_id=project_id)
        global_services = self.deployment_manager.list_services(
            project_id=f"{config.settings.SYSTEM_NAMESPACE}-global"
        )

        extension_services = []
        for service in [*project_services, *global_services]:
            # TODO: Add a function to deployment-manager that allows direct filtering
            if service.deployment_type != DeploymentType.EXTENSION.value:
                continue

            extension = Extension(**service.dict())
            if service.metadata:
                extension.ui_extension_endpoint = service.metadata[
                    "ui_extension_endpoint"
                ]
                extension.api_extension_endpoint = service.metadata[
                    "api_extension_endpoints"
                ]
            extension_services.append(extension)

        return extension_services

    def get_default_extension(self, operation: ExtensibleOperations) -> str:
        return CORE_EXTENSION_ID

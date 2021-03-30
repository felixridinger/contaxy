from datetime import datetime
from typing import Dict, List, Optional

import requests
from pydantic import parse_obj_as

from contaxy.clients.shared import handle_errors
from contaxy.operations.deployment import DeploymentOperations
from contaxy.schema import Job, JobInput, ResourceAction, Service, ServiceInput


class DeploymentManagerClient(DeploymentOperations):
    def __init__(self, client: requests.Session):
        self._client = client

    @property
    def client(self) -> requests.Session:
        return self._client

    def list_services(
        self, project_id: str, request_kwargs: Dict = {}
    ) -> List[Service]:
        response = self.client.get(f"/projects{project_id}/services", **request_kwargs)
        handle_errors(response)
        return parse_obj_as(List[Service], response.json())

    def deploy_service(
        self,
        project_id: str,
        service: ServiceInput,
        action_id: Optional[str] = None,
        request_kwargs: Dict = {},
    ) -> Service:
        params = {}
        if action_id:
            params["action_id"] = action_id
        resource = self.client.post(
            f"/projects/{project_id}/services",
            params=params,
            json=service.dict(exclude_unset=True),
            **request_kwargs,
        )
        handle_errors(resource)
        return parse_obj_as(Service, resource.json())

    def list_deploy_service_actions(
        self,
        project_id: str,
        service: ServiceInput,
        request_kwargs: Dict = {},
    ) -> List[ResourceAction]:
        resources = self.client.get(
            f"/projects/{project_id}/services:deploy-actions",
            json=service.dict(exclude_unset=True),
            **request_kwargs,
        )
        handle_errors(resources)
        return parse_obj_as(List[ResourceAction], resources.json())

    def get_service_metadata(
        self,
        project_id: str,
        service_id: str,
        request_kwargs: Dict = {},
    ) -> Service:
        resource = self.client.get(
            f"/projects/{project_id}/services/{service_id}", **request_kwargs
        )
        handle_errors(resource)
        return parse_obj_as(Service, resource.json())

    def delete_service(
        self,
        project_id: str,
        service_id: str,
        delete_volumes: bool = False,
        request_kwargs: Dict = {},
    ) -> None:
        response = self.client.delete(
            f"/projects/{project_id}/services/{service_id}",
            params={"delete_volumes": delete_volumes},
            **request_kwargs,
        )
        handle_errors(response)

    def get_service_logs(
        self,
        project_id: str,
        service_id: str,
        lines: Optional[int],
        since: Optional[datetime],
        request_kwargs: Dict = {},
    ) -> str:
        params = {}
        if lines:
            params["lines"] = str(lines)
        if since:
            params["since"] = since.__str__()
        response = self.client.get(
            f"/projects/{project_id}/services/{service_id}/logs",
            params=params,
            **request_kwargs,
        )
        handle_errors(response)
        return response.text

    def suggest_service_config(
        self,
        project_id: str,
        container_image: str,
        request_kwargs: Dict = {},
    ) -> ServiceInput:
        resource = self.client.get(
            f"/projects/{project_id}/services:suggest-config",
            params={"container_image": container_image},
            **request_kwargs,
        )
        handle_errors(resource)
        return parse_obj_as(ServiceInput, resource.json())

    def list_service_actions(
        self,
        project_id: str,
        service_id: str,
        request_kwargs: Dict = {},
    ) -> List[ResourceAction]:
        resources = self.client.get(
            f"/projects/{project_id}/services/{service_id}/actions", **request_kwargs
        )
        handle_errors(resources)
        return parse_obj_as(List[ResourceAction], resources.json())

    def execute_service_action(
        self,
        project_id: str,
        service_id: str,
        action_id: str,
        request_kwargs: Dict = {},
    ) -> None:
        response = self.client.get(
            f"/projects/{project_id}/services/{service_id}/actions/{action_id}",
            **request_kwargs,
        )
        handle_errors(response)
        # TODO: Return response?

    def list_jobs(
        self,
        project_id: str,
        request_kwargs: Dict = {},
    ) -> List[Job]:
        resources = self.client.get(f"/projects/{project_id}/jobs", **request_kwargs)
        handle_errors(resources)
        return parse_obj_as(List[Job], resources.json())

    def deploy_job(
        self,
        project_id: str,
        job: JobInput,
        action_id: Optional[str] = None,
        request_kwargs: Dict = {},
    ) -> Job:
        params = {}
        if action_id:
            params["action_id"] = action_id
        resource = self.client.post(
            f"/projects/{project_id}/jobs",
            params=params,
            json=job.dict(exclude_unset=True),
            **request_kwargs,
        )
        handle_errors(resource)
        return parse_obj_as(Job, resource.json())

    def list_deploy_job_actions(
        self,
        project_id: str,
        job: JobInput,
        request_kwargs: Dict = {},
    ) -> List[ResourceAction]:
        resources = self.client.get(
            f"/projects/{project_id}/jobs:deploy-actions",
            json=job.dict(exclude_unset=True),
            **request_kwargs,
        )
        handle_errors(resources)
        return parse_obj_as(List[ResourceAction], resources.json())

    def suggest_job_config(
        self,
        project_id: str,
        container_image: str,
        request_kwargs: Dict = {},
    ) -> JobInput:
        resource = self.client.get(
            f"/projects/{project_id}/jobs:suggest-config",
            params={"container_image": container_image},
            **request_kwargs,
        )
        handle_errors(resource)
        return parse_obj_as(JobInput, resource.json())

    def get_job_metadata(
        self,
        project_id: str,
        job_id: str,
        request_kwargs: Dict = {},
    ) -> Job:
        resource = self.client.get(
            f"/projects/{project_id}/jobs/{job_id}", **request_kwargs
        )
        handle_errors(resource)
        return parse_obj_as(Job, resource.json())

    def delete_job(
        self,
        project_id: str,
        job_id: str,
        request_kwargs: Dict = {},
    ) -> None:
        response = self.client.delete(
            f"/projects/{project_id}/jobs/{job_id}",
            **request_kwargs,
        )
        handle_errors(response)

    def get_job_logs(
        self,
        project_id: str,
        job_id: str,
        lines: Optional[int] = None,
        since: Optional[datetime] = None,
        request_kwargs: Dict = {},
    ) -> str:
        params = {}
        if lines:
            params["lines"] = str(lines)
        if since:
            params["since"] = since.__str__()
        response = self.client.get(
            f"/projects/{project_id}/jobs/{job_id}/logs",
            params=params,
            **request_kwargs,
        )
        handle_errors(response)
        return response.text

    def list_job_actions(
        self,
        project_id: str,
        job_id: str,
        request_kwargs: Dict = {},
    ) -> List[ResourceAction]:
        resources = self.client.get(
            f"/projects/{project_id}/jobs/{job_id}/actions", **request_kwargs
        )
        handle_errors(resources)
        return parse_obj_as(List[ResourceAction], resources.json())

    def execute_job_action(
        self,
        project_id: str,
        job_id: str,
        action_id: str,
        request_kwargs: Dict = {},
    ) -> None:
        response = self.client.get(
            f"/projects/{project_id}/jobs/{job_id}/actions/{action_id}",
            **request_kwargs,
        )
        handle_errors(response)
        # TODO: Return response?

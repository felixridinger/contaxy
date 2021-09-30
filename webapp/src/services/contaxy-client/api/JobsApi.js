/**
 * Contaxy API
 * Functionality to create and manage projects, services, jobs, and files.
 *
 * The version of the OpenAPI document: 0.0.2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Job from '../model/Job';
import JobInput from '../model/JobInput';
import ProblemDetails from '../model/ProblemDetails';
import ResourceAction from '../model/ResourceAction';

/**
 * Jobs service.
 * @module api/JobsApi
 * @version 0.0.2
 */
export default class JobsApi {
  /**
   * Constructs a new JobsApi.
   * @alias module:api/JobsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Delete a job.
   * Deletes a job.  This will kill and remove the container and all associated deployment artifacts.
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
   */
  deleteJobWithHttpInfo(projectId, jobId) {
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling deleteJob"
      );
    }
    // verify the required parameter 'jobId' is set
    if (jobId === undefined || jobId === null) {
      throw new Error(
        "Missing the required parameter 'jobId' when calling deleteJob"
      );
    }

    let pathParams = {
      project_id: projectId,
      job_id: jobId,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = null;
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs/{job_id}',
      'DELETE',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Delete a job.
   * Deletes a job.  This will kill and remove the container and all associated deployment artifacts.
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}
   */
  deleteJob(projectId, jobId) {
    return this.deleteJobWithHttpInfo(projectId, jobId).then(function (
      response_and_data
    ) {
      return response_and_data.data;
    });
  }

  /**
   * Delete all jobs.
   * Deletes all jobs associated with a project.
   * @param {String} projectId A valid project ID.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
   */
  deleteJobsWithHttpInfo(projectId, opts) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling deleteJobs"
      );
    }

    let pathParams = {
      project_id: projectId,
    };
    let queryParams = {
      extension_id: opts['extensionId'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = null;
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs',
      'DELETE',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Delete all jobs.
   * Deletes all jobs associated with a project.
   * @param {String} projectId A valid project ID.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}
   */
  deleteJobs(projectId, opts) {
    return this.deleteJobsWithHttpInfo(projectId, opts).then(function (
      response_and_data
    ) {
      return response_and_data.data;
    });
  }

  /**
   * Deploy a job.
   * Deploy a job for the specified project.  If no `action_id` is provided, the system will automatically select the best deployment option.  Available actions can be requested via the [list_deploy_job_actions](#jobs/list_deploy_job_actions) operation. If the action is from an extension, the `action_id` must be a composite ID with the following format: `{extension_id}~{action_id}`.  The action mechanism is further explained in the description of the [list_deploy_job_actions](#jobs/list_deploy_job_actions).
   * @param {String} projectId A valid project ID.
   * @param {module:model/JobInput} jobInput
   * @param {Object} opts Optional parameters
   * @param {String} opts.actionId The action ID from the job deploy options.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Job} and HTTP response
   */
  deployJobWithHttpInfo(projectId, jobInput, opts) {
    opts = opts || {};
    let postBody = jobInput;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling deployJob"
      );
    }
    // verify the required parameter 'jobInput' is set
    if (jobInput === undefined || jobInput === null) {
      throw new Error(
        "Missing the required parameter 'jobInput' when calling deployJob"
      );
    }

    let pathParams = {
      project_id: projectId,
    };
    let queryParams = {
      action_id: opts['actionId'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = Job;
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs',
      'POST',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Deploy a job.
   * Deploy a job for the specified project.  If no `action_id` is provided, the system will automatically select the best deployment option.  Available actions can be requested via the [list_deploy_job_actions](#jobs/list_deploy_job_actions) operation. If the action is from an extension, the `action_id` must be a composite ID with the following format: `{extension_id}~{action_id}`.  The action mechanism is further explained in the description of the [list_deploy_job_actions](#jobs/list_deploy_job_actions).
   * @param {String} projectId A valid project ID.
   * @param {module:model/JobInput} jobInput
   * @param {Object} opts Optional parameters
   * @param {String} opts.actionId The action ID from the job deploy options.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Job}
   */
  deployJob(projectId, jobInput, opts) {
    return this.deployJobWithHttpInfo(projectId, jobInput, opts).then(function (
      response_and_data
    ) {
      return response_and_data.data;
    });
  }

  /**
   * Execute a job action.
   * Executes the selected job action.  The actions need to be first requested from the [list_job_actions](#jobs/list_job_actions) operation. If the action is from an extension, the `action_id` must be a composite ID with the following format: `{extension_id}~{action_id}`.  The action mechanism is further explained in the description of the [list_job_actions](#jobs/list_job_actions).
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @param {String} actionId The action ID from the list_job_actions operation.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
   */
  executeJobActionWithHttpInfo(projectId, jobId, actionId) {
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling executeJobAction"
      );
    }
    // verify the required parameter 'jobId' is set
    if (jobId === undefined || jobId === null) {
      throw new Error(
        "Missing the required parameter 'jobId' when calling executeJobAction"
      );
    }
    // verify the required parameter 'actionId' is set
    if (actionId === undefined || actionId === null) {
      throw new Error(
        "Missing the required parameter 'actionId' when calling executeJobAction"
      );
    }

    let pathParams = {
      project_id: projectId,
      job_id: jobId,
      action_id: actionId,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = Object;
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs/{job_id}/actions/{action_id}',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Execute a job action.
   * Executes the selected job action.  The actions need to be first requested from the [list_job_actions](#jobs/list_job_actions) operation. If the action is from an extension, the `action_id` must be a composite ID with the following format: `{extension_id}~{action_id}`.  The action mechanism is further explained in the description of the [list_job_actions](#jobs/list_job_actions).
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @param {String} actionId The action ID from the list_job_actions operation.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
   */
  executeJobAction(projectId, jobId, actionId) {
    return this.executeJobActionWithHttpInfo(projectId, jobId, actionId).then(
      function (response_and_data) {
        return response_and_data.data;
      }
    );
  }

  /**
   * Get job logs.
   * Returns the stdout/stderr logs of the job.
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @param {Object} opts Optional parameters
   * @param {Number} opts.lines Only show the last n lines.
   * @param {Date} opts.since Only show the logs generated after a given date.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link String} and HTTP response
   */
  getJobLogsWithHttpInfo(projectId, jobId, opts) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling getJobLogs"
      );
    }
    // verify the required parameter 'jobId' is set
    if (jobId === undefined || jobId === null) {
      throw new Error(
        "Missing the required parameter 'jobId' when calling getJobLogs"
      );
    }

    let pathParams = {
      project_id: projectId,
      job_id: jobId,
    };
    let queryParams = {
      lines: opts['lines'],
      since: opts['since'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = 'String';
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs/{job_id}/logs',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Get job logs.
   * Returns the stdout/stderr logs of the job.
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @param {Object} opts Optional parameters
   * @param {Number} opts.lines Only show the last n lines.
   * @param {Date} opts.since Only show the logs generated after a given date.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link String}
   */
  getJobLogs(projectId, jobId, opts) {
    return this.getJobLogsWithHttpInfo(projectId, jobId, opts).then(function (
      response_and_data
    ) {
      return response_and_data.data;
    });
  }

  /**
   * Get job metadata.
   * Returns the metadata of a single job.  The returned metadata might be filtered based on the permission level of the authenticated user.
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Job} and HTTP response
   */
  getJobMetadataWithHttpInfo(projectId, jobId) {
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling getJobMetadata"
      );
    }
    // verify the required parameter 'jobId' is set
    if (jobId === undefined || jobId === null) {
      throw new Error(
        "Missing the required parameter 'jobId' when calling getJobMetadata"
      );
    }

    let pathParams = {
      project_id: projectId,
      job_id: jobId,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = Job;
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs/{job_id}',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Get job metadata.
   * Returns the metadata of a single job.  The returned metadata might be filtered based on the permission level of the authenticated user.
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Job}
   */
  getJobMetadata(projectId, jobId) {
    return this.getJobMetadataWithHttpInfo(projectId, jobId).then(function (
      response_and_data
    ) {
      return response_and_data.data;
    });
  }

  /**
   * List deploy job actions.
   * Lists all available job deployment options (actions).  The returned action IDs should be used when calling the [deploy_job](#job/deploy_job) operation.  The action mechanism allows extensions to provide additional deployment options for a job based on the provided configuration. It works the following way:  1. The user requests all available deployment options via the [list_deploy_job_actions](#jobs/list_deploy_job_actions) operation. 2. The operation will be forwarded to all installed extensions that have implemented the [list_deploy_job_actions](#jobs/list_deploy_job_actions) operation. 3. Extensions can run arbitrary code based on the provided job configuration and return a list of actions with self-defined action IDs. 4. The user selects one of those actions and triggers the [deploy_job](#jobs/deploy_job) operation by providing the selected action ID. The `action_id` from an extension contains the extension ID. 5. The operation is forwarded to the selected extension, which can run arbitrary code to deploy the job based on the provided configuration. 6. The return value of the operation should be a `Job` object.  The same action mechanism is also used for other type of actions on resources.
   * @param {String} projectId A valid project ID.
   * @param {module:model/JobInput} jobInput
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/ResourceAction>} and HTTP response
   */
  listDeployJobActionsWithHttpInfo(projectId, jobInput, opts) {
    opts = opts || {};
    let postBody = jobInput;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling listDeployJobActions"
      );
    }
    // verify the required parameter 'jobInput' is set
    if (jobInput === undefined || jobInput === null) {
      throw new Error(
        "Missing the required parameter 'jobInput' when calling listDeployJobActions"
      );
    }

    let pathParams = {
      project_id: projectId,
    };
    let queryParams = {
      extension_id: opts['extensionId'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = ['application/json'];
    let accepts = ['application/json'];
    let returnType = [ResourceAction];
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs:deploy-actions',
      'POST',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * List deploy job actions.
   * Lists all available job deployment options (actions).  The returned action IDs should be used when calling the [deploy_job](#job/deploy_job) operation.  The action mechanism allows extensions to provide additional deployment options for a job based on the provided configuration. It works the following way:  1. The user requests all available deployment options via the [list_deploy_job_actions](#jobs/list_deploy_job_actions) operation. 2. The operation will be forwarded to all installed extensions that have implemented the [list_deploy_job_actions](#jobs/list_deploy_job_actions) operation. 3. Extensions can run arbitrary code based on the provided job configuration and return a list of actions with self-defined action IDs. 4. The user selects one of those actions and triggers the [deploy_job](#jobs/deploy_job) operation by providing the selected action ID. The `action_id` from an extension contains the extension ID. 5. The operation is forwarded to the selected extension, which can run arbitrary code to deploy the job based on the provided configuration. 6. The return value of the operation should be a `Job` object.  The same action mechanism is also used for other type of actions on resources.
   * @param {String} projectId A valid project ID.
   * @param {module:model/JobInput} jobInput
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/ResourceAction>}
   */
  listDeployJobActions(projectId, jobInput, opts) {
    return this.listDeployJobActionsWithHttpInfo(
      projectId,
      jobInput,
      opts
    ).then(function (response_and_data) {
      return response_and_data.data;
    });
  }

  /**
   * List job actions.
   * Lists all actions available for the specified job.  The returned action IDs should be used when calling the [execute_job_action](#jobs/execute_job_action) operation.  The action mechanism allows extensions to provide additional functionality on jobs. It works the following way:  1. The user requests all available actions via the [list_job_actions](#jobs/list_job_actions) operation. 2. The operation will be forwarded to all installed extensions that have implemented the [list_job_actions](#jobs/list_job_actions) operation. 3. Extensions can run arbitrary code - e.g., request and check the job metadata for compatibility - and return a list of actions with self-defined action IDs. 4. The user selects one of those actions and triggers the [execute_job_action](#jobs/execute_job_action) operation by providing the selected action ID. The `action_id` from an extension contains the extension ID. 5. The operation is forwarded to the selected extension, which can run arbitrary code to execute the selected action. 6. The return value of the operation can be either a simple message (shown to the user) or a redirect to another URL (e.g., to show a web UI).  The same action mechanism is also used for other resources (e.g., files, services). It can support a very broad set of use-cases, for example: Access to dashboards for monitoring, adminsitration tools, and more...
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/ResourceAction>} and HTTP response
   */
  listJobActionsWithHttpInfo(projectId, jobId, opts) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling listJobActions"
      );
    }
    // verify the required parameter 'jobId' is set
    if (jobId === undefined || jobId === null) {
      throw new Error(
        "Missing the required parameter 'jobId' when calling listJobActions"
      );
    }

    let pathParams = {
      project_id: projectId,
      job_id: jobId,
    };
    let queryParams = {
      extension_id: opts['extensionId'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = [ResourceAction];
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs/{job_id}/actions',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * List job actions.
   * Lists all actions available for the specified job.  The returned action IDs should be used when calling the [execute_job_action](#jobs/execute_job_action) operation.  The action mechanism allows extensions to provide additional functionality on jobs. It works the following way:  1. The user requests all available actions via the [list_job_actions](#jobs/list_job_actions) operation. 2. The operation will be forwarded to all installed extensions that have implemented the [list_job_actions](#jobs/list_job_actions) operation. 3. Extensions can run arbitrary code - e.g., request and check the job metadata for compatibility - and return a list of actions with self-defined action IDs. 4. The user selects one of those actions and triggers the [execute_job_action](#jobs/execute_job_action) operation by providing the selected action ID. The `action_id` from an extension contains the extension ID. 5. The operation is forwarded to the selected extension, which can run arbitrary code to execute the selected action. 6. The return value of the operation can be either a simple message (shown to the user) or a redirect to another URL (e.g., to show a web UI).  The same action mechanism is also used for other resources (e.g., files, services). It can support a very broad set of use-cases, for example: Access to dashboards for monitoring, adminsitration tools, and more...
   * @param {String} projectId A valid project ID.
   * @param {String} jobId A valid job ID.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/ResourceAction>}
   */
  listJobActions(projectId, jobId, opts) {
    return this.listJobActionsWithHttpInfo(projectId, jobId, opts).then(
      function (response_and_data) {
        return response_and_data.data;
      }
    );
  }

  /**
   * List project jobs.
   * Lists all jobs associated with the given project.
   * @param {String} projectId A valid project ID.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/Job>} and HTTP response
   */
  listJobsWithHttpInfo(projectId, opts) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling listJobs"
      );
    }

    let pathParams = {
      project_id: projectId,
    };
    let queryParams = {
      extension_id: opts['extensionId'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = [Job];
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * List project jobs.
   * Lists all jobs associated with the given project.
   * @param {String} projectId A valid project ID.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/Job>}
   */
  listJobs(projectId, opts) {
    return this.listJobsWithHttpInfo(projectId, opts).then(function (
      response_and_data
    ) {
      return response_and_data.data;
    });
  }

  /**
   * Suggest job configuration.
   * Suggests an input configuration based on the provided `container_image`.  The suggestion is based on metadata extracted from the container image (e.g. labels) as well as suggestions based on previous project deployments with the same image.
   * @param {String} projectId A valid project ID.
   * @param {String} containerImage Container image to use for suggestion.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/JobInput} and HTTP response
   */
  suggestJobConfigWithHttpInfo(projectId, containerImage, opts) {
    opts = opts || {};
    let postBody = null;
    // verify the required parameter 'projectId' is set
    if (projectId === undefined || projectId === null) {
      throw new Error(
        "Missing the required parameter 'projectId' when calling suggestJobConfig"
      );
    }
    // verify the required parameter 'containerImage' is set
    if (containerImage === undefined || containerImage === null) {
      throw new Error(
        "Missing the required parameter 'containerImage' when calling suggestJobConfig"
      );
    }

    let pathParams = {
      project_id: projectId,
    };
    let queryParams = {
      container_image: containerImage,
      extension_id: opts['extensionId'],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [
      'APIKeyCookie',
      'APIKeyHeader',
      'APIKeyQuery',
      'OAuth2PasswordBearer',
    ];
    let contentTypes = [];
    let accepts = ['application/json'];
    let returnType = JobInput;
    return this.apiClient.callApi(
      '/projects/{project_id}/jobs:suggest-config',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null
    );
  }

  /**
   * Suggest job configuration.
   * Suggests an input configuration based on the provided `container_image`.  The suggestion is based on metadata extracted from the container image (e.g. labels) as well as suggestions based on previous project deployments with the same image.
   * @param {String} projectId A valid project ID.
   * @param {String} containerImage Container image to use for suggestion.
   * @param {Object} opts Optional parameters
   * @param {String} opts.extensionId Extension ID. If not specified, the system will decide. Use `core` to explicitly select the core platform.
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/JobInput}
   */
  suggestJobConfig(projectId, containerImage, opts) {
    return this.suggestJobConfigWithHttpInfo(
      projectId,
      containerImage,
      opts
    ).then(function (response_and_data) {
      return response_and_data.data;
    });
  }
}

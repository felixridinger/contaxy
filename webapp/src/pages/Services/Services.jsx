import React, { useCallback, useMemo } from 'react';
// import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import { servicesApi } from '../../services/contaxy-api';
import { useServices } from '../../services/api-hooks';
import { useShowAppDialog } from '../../app/AppDialogServiceProvider';
import ContentDialog from '../../components/Dialogs/ContentDialog';
import DeployServiceDialog from '../../components/Dialogs/DeployContainerDialog';
import GlobalStateContainer from '../../app/store';
import ResourceActionsDialog from '../../components/Dialogs/ResourceActionsDialog';
import ServicesContainer from './ServicesContainer';
import showStandardSnackbar from '../../app/showStandardSnackbar';

function Services(props) {
  const { className } = props;
  const { t } = useTranslation();
  const { activeProject } = GlobalStateContainer.useContainer();
  const showAppDialog = useShowAppDialog();
  const [services, reloadServices] = useServices(activeProject.id);

  const onServiceDeploy = useCallback(() => {
    showAppDialog(DeployServiceDialog, {
      onDeploy: async (
        {
          containerImage,
          deploymentName,
          deploymentParameters,
          deploymentEndpoints,
        },
        onClose
      ) => {
        const serviceInput = {
          container_image: containerImage,
          display_name: deploymentName,
          endpoints: deploymentEndpoints,
          parameters: deploymentParameters,
        };
        try {
          await servicesApi.deployService(activeProject.id, serviceInput);
          showStandardSnackbar(`Deployed service '${deploymentName}'`);
          onClose();
          reloadServices();
        } catch (err) {
          showStandardSnackbar(`Could not deploy service '${deploymentName}'.`);
        }
      },
    });
  }, [activeProject.id, showAppDialog, reloadServices]);

  const onShowServiceMetadata = useCallback(
    async (projectId, serviceId) => {
      try {
        const serviceMetadata = await servicesApi.getServiceMetadata(
          projectId,
          serviceId
        );
        showAppDialog(ContentDialog, {
          jsonContent: serviceMetadata,
          title: 'Service Metadata',
        });
      } catch (err) {
        showStandardSnackbar('Could not load service metadata');
      }
    },
    [showAppDialog]
  );

  const onShowServiceLogs = useCallback(
    async (projectId, serviceId) => {
      try {
        const logs = await servicesApi.getServiceLogs(projectId, serviceId);
        showAppDialog(ContentDialog, { content: logs, title: 'Logs' });
      } catch (err) {
        showStandardSnackbar('Could not load service logs');
      }
    },
    [showAppDialog]
  );

  const onServiceDelete = useCallback(
    async (projectId, serviceId) => {
      try {
        await servicesApi.deleteService(projectId, serviceId);
        showStandardSnackbar(`Deleted service '${serviceId}'`);
        reloadServices();
      } catch (err) {
        showStandardSnackbar(`Could not delete service '${serviceId}'`);
      }
    },
    [reloadServices]
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  const onExecuteAction = useCallback(async (resource, resourceAction) => {
    try {
      // servicesApi.apiClient.agent.redirects(0);
      // const response = await servicesApi.executeServiceAction(
      //   activeProject.id,
      //   resource.id,
      //   resourceAction.action_id
      // );

      if (resourceAction.instructions) {
        resourceAction.instructions.some((instruction) => {
          if (instruction.type && instruction.type === 'new-tab') {
            window.open(instruction.url);
            return true;
          }

          return false;
        });
      }
    } catch (e) {
      showStandardSnackbar(
        `Could not execute action '${resourceAction.action_id}' for service '${resource.id}'. Reason: ${e}`
      );
    }
  });

  const onShowServiceActions = useCallback(
    async (projectId, service) => {
      try {
        const resourceActions = await servicesApi.listServiceActions(
          projectId,
          service.id
        );
        const title = `Service Actions`;
        showAppDialog(ResourceActionsDialog, {
          resource: service,
          resourceActions,
          onExecuteAction,
          title,
        });
      } catch (err) {
        showStandardSnackbar(
          `Could not show actions for service '${service.id}'`
        );
      }
    },
    [showAppDialog, onExecuteAction]
  );

  const servicesContainer = useMemo(
    () => (
      <ServicesContainer
        data={services}
        onReload={reloadServices}
        onServiceDelete={(rowData) =>
          onServiceDelete(activeProject.id, rowData.id)
        }
        onShowServiceActions={(rowData) =>
          onShowServiceActions(activeProject.id, rowData)
        }
        onShowServiceLogs={(rowData) =>
          onShowServiceLogs(activeProject.id, rowData.id)
        }
        onShowServiceMetadata={(rowData) =>
          onShowServiceMetadata(activeProject.id, rowData.id)
        }
      />
    ),
    [
      activeProject.id,
      services,
      onServiceDelete,
      onShowServiceActions,
      onShowServiceLogs,
      onShowServiceMetadata,
      reloadServices,
    ]
  );

  return (
    <div className="pages-native-component">
      <Button
        variant="contained"
        color="primary"
        onClick={onServiceDeploy}
        className={`${className} button`}
      >
        {`${t('add')} ${t('service')}`}
      </Button>
      {servicesContainer}
      {/* <ServicesContainer
        data={services}
        onReload={reloadServices}
        onServiceDelete={(rowData) =>
          onServiceDelete(activeProject.id, rowData.id)
        }
        onShowServiceActions={(rowData) =>
          onShowServiceActions(activeProject.id, rowData)
        }
        onShowServiceLogs={(rowData) =>
          onShowServiceLogs(activeProject.id, rowData.id)
        }
        onShowServiceMetadata={(rowData) =>
          onShowServiceMetadata(activeProject.id, rowData.id)
        }
      /> */}
    </div>
  );
}

Services.propTypes = {
  className: PropTypes.string,
};

Services.defaultProps = {
  className: '',
};

const StyledServices = styled(Services)`
  &.button {
    margin: 8px 0px;
  }
`;

export default StyledServices;

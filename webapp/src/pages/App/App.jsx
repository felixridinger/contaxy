import React, { useEffect, useState } from 'react';

// import { useTranslation } from 'react-i18next';

import './App.css';
import { extensionsApi, authApi, usersApi } from '../../services/contaxy-api';
import { mapExtensionToAppPage } from '../../utils/app-pages';
import AppBar from '../../components/AppBar/AppBar';
import AppDrawer from '../../components/AppDrawer/AppDrawer';
import ContentContainer from '../../app/routing/ContentContainer';
import GlobalStateContainer from '../../app/store';

function App() {
  // const { t } = useTranslation();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [additionalAppDrawerItems, setAdditionalAppDrawerItems] = useState([]);
  const {
    activeProject,
    loadProjects,
    setUser,
    user,
    projectExtensions,
    setProjectExtensions,
    setIsAuthenticated,
    isAuthenticated,
    setOauthEnabled,
  } = GlobalStateContainer.useContainer();
  const onDrawerClick = () => setDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    if (!user) return;
    loadProjects();
  }, [user, loadProjects]);

  if (!isAuthenticated) {
    // Check whether the user is logged in currently (the auth cookie - if existing - is sent to the endpoint which returns a user object when a valid token exists and an error otherwise)
    usersApi
      .getMyUser()
      .then((res) => {
        setUser(res);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
      });
  }
  if (!isAuthenticated) {
    authApi
      .oauthEnabled()
      .then(() => {
        setOauthEnabled(true);
      })
      .catch(() => {
        setOauthEnabled(false);
      });
  }

  useEffect(() => {
    if (!activeProject.id) return;
    extensionsApi
      .listExtensions(activeProject.id)
      .then((res) => setProjectExtensions(res))
      .catch(() => {});
    }, [activeProject, setProjectExtensions, user]);

  useEffect(() => {
    setAdditionalAppDrawerItems(
      projectExtensions.map((extension) => mapExtensionToAppPage(extension))
    );
  }, [projectExtensions]);

  const appDrawerElement = (
    <AppDrawer
      isAdmin
      open={isDrawerOpen}
      additionalPages={additionalAppDrawerItems}
      handleDrawerClose={onDrawerClick}
    />
  );

  return (
    <div className="App">
      <AppBar isAuthenticated={isAuthenticated} onDrawerOpen={onDrawerClick} />
      {user ? appDrawerElement : false}
      <main className="main">
        <ContentContainer isAuthenticated={isAuthenticated}  additionalPages={additionalAppDrawerItems} />
      </main>
      <div id="snackbar-container" />
    </div>
  );
}

export default App;

import { Grommet } from 'grommet';
import React, { Children } from 'react';
import theme from './theme';
import DashboardIcon from './Views/Dashboard';
import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';
import SearchPage from './Views/SearchPage';


const RouterContext = React.createContext({});

const Router = ({ children }) => {
  const [path, setPath] = React.useState("/")

  React.useEffect(() => {
    const onPopState = () => setPath(document.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const push = (nextPath, reload) => {
    if (reload) {
      window.location.reload();
      return;
    }
    if (nextPath !== path) {
      window.history.pushState(undefined, undefined, nextPath)
      setPath(nextPath)
      window.scrollTo(0, 0)
    }
  }

  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  )
}

const Routes = ({ children }) => {
  const { path: contextPath } = React.useContext(RouterContext)
  let found
  Children.forEach(children, child => {
    if (!found && contextPath === child.props.path) found = child
  })
  return found
}

const Route = ({ Component, path }) => {
  const { path: contextPath } = React.useContext(RouterContext)
  return contextPath === path ? <Component /> : null
}

var x = () => (
  <Grommet full theme={theme}>
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/dashboard" Component={DashboardIcon} />
        <Route path="/search" Component={SearchPage} />
      </Routes>
    </Router>
  </Grommet>
);

export default x;
export {
  RouterContext
};

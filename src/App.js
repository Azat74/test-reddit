/* eslint-disable react/prop-types */
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LoginPage } from './pages/LoginPage'
import { IndexPage } from './pages/IndexPage'
import { ProfilePage } from './pages/ProfilePage'
import { Page404 } from './pages/Page404'
import { selectAuth, logout as logoutAction } from './store/auth'
import './App.css'

function LoginRoute({ component: Component, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuth) {
          return <Component {...rest} />
        } else {
          const nextPath = () => {
            return props.location.state?.from?.pathname
              ? props.location.state.from.pathname
              : '/'
          }

          return (
            <Redirect
              to={{ pathname: nextPath(), state: { from: props.location } }}
            />
          )
        }
      }}
    />
  )
}

function LogoutRoute({ logoutAction, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        logoutAction()
        const nextPath = () => {
          return props.location.state?.from?.pathname
            ? props.location.state.from.pathname
            : '/'
        }

        return (
          <Redirect
            to={{ pathname: nextPath(), state: { from: props.location } }}
          />
        )
      }}
    />
  )
}

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const Routes = (props) => {
  const { routes, isAuth } = props
  const dispatch = useDispatch()

  return (
    <Switch>
      {[
        ...routes.map((route) => {
          const exact = route.path === '/' ? true : false

          if (!route.private) {
            return (
              <Route
                path={route.path}
                exact={exact}
                key={route.path}
                render={(props) => <route.component {...props} />}
              />
            )
          } else {
            return (
              <PrivateRoute
                path={route.path}
                key={route.path}
                exact={exact}
                component={route.component}
                isAuth={isAuth}
              />
            )
          }
        }),
        <LoginRoute
          path={'/login'}
          exact
          key={'/login'}
          component={LoginPage}
          isAuth={isAuth}
        />,
        <LogoutRoute
          path={'/logout'}
          exact
          key={'/logout'}
          logoutAction={() => dispatch(logoutAction())}
          isAuth={isAuth}
        />,
        <Route key="/page404" render={Page404} />,
      ]}
    </Switch>
  )
}

const routes = [
  {
    path: '/',
    component: IndexPage,
    name: 'Главная страница',
  },
  {
    path: '/profile',
    component: ProfilePage,
    name: 'Профиль',
    private: true,
  },
]

function App() {
  const isAuth = useSelector(selectAuth)

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Link key="/" to="/">
              Index
            </Link>
            <Link key="/login" to="/login">
              Login
            </Link>
            <Link key="/profile" to="/profile">
              Profile
            </Link>
            {isAuth ? (
              <Link key="/logout" to="/logout">
                Logout
              </Link>
            ) : undefined}
          </nav>
        </header>
        <main>
          <Routes routes={routes} isAuth={isAuth} />
        </main>
      </div>
    </Router>
  )
}

export default App

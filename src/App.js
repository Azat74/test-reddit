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
import { IndexPage } from './pages/IndexPage'
import { Page404 } from './pages/Page404'
import './App.css'

const Routes = (props) => {
  const { routes } = props

  return (
    <Switch>
      {[
        ...routes.map((route) => {
          const exact = route.path === '/' ? true : false

          return (
            <Route
              path={route.path}
              exact={exact}
              key={route.path}
              render={(props) => <route.component {...props} />}
            />
          )
        }),
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
]

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <Link key="/" to="/">
              Index
            </Link>
            {/* <Link key="/login" to="/login">
              Login
            </Link> */}
            {/* <Link key="/search" to="/profile">
              Profile
            </Link> */}
          </nav>
        </header>
        <main>
          <Routes routes={routes} />
        </main>
      </div>
    </Router>
  )
}

export default App

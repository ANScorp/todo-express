import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import TodoList from '../features/todos/TodoList';

const router = (
      <Router>
        <Switch>
          <Route
            exact
            path={[
              '/:filter(active|completed)?',
              '/todo/:id/:action(edit)?',
            ]}
          >
            <TodoList />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
);

export default function App() {
  return router;
}

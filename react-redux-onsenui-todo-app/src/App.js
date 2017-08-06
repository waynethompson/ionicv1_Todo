import React, { Component } from 'react';
import './App.css';
import {
  Navigator,
} from 'react-onsenui';
import Splitter from './components/Splitter';
import SubPage from './components/SubPage';
import EditTodo from './components/EditTodo';

export default class App extends Component {

  static _navigator;

  static popPage() {
    this._navigator.popPage();
  }

  static openNewTodo() {
    this.pushPage(SubPage, {
      child: <EditTodo />,
    });
  }

  static openEditTodo(todo) {
    this.pushPage(SubPage, {
      child: <EditTodo todo={todo} />,
    });
  }

  static pushPage(comp, props = {}, options = {}) {
    this._navigator.pushPage({
      comp,
      props,
    }, options);
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          comp: Splitter,
          props: {},
        }}
        renderPage={this._renderPage} />
    );
  }

  _renderPage(route, navigator) {
    App._navigator = navigator;
    return React.createElement(route.comp, route.props);
  }
}
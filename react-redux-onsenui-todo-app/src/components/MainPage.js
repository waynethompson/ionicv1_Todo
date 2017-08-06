import React, { Component } from 'react';
import {
  Page,
  Toolbar,
  ToolbarButton,
  Icon,
  Tabbar,
  Tab,
} from 'react-onsenui';
import { connect } from 'react-redux';
import { ActionCreator, CATEGORY_ALL, CATEGORY_NONE } from '../ActionCreator';
import lang from '../lang';
import TodoList from './TodoList';
import App from '.././App';

class MainPage extends Component {
  static propTypes = {
    openSideMenu: React.PropTypes.func.isRequired,
    todoList: React.PropTypes.array.isRequired,
    getTodo: React.PropTypes.func.isRequired,
    filter: React.PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
  }

  componentDidMount() {
    this.props.getTodo();
  }

  render() {
    return (
      <Page
        renderToolbar={this._renderToolbar.bind(this)}>
        <Tabbar
          index={this.state.tabIndex}
          renderTabs={this._renderTabs.bind(this)}
          onPreChange={this._onPreChangeTab.bind(this)}/>
      </Page>
    );
  }

  _renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <ToolbarButton onClick={this._onClickSideMenu.bind(this)}>
            <Icon icon='ion-navicon, material:md-menu'/>
          </ToolbarButton>
        </div>
        <div className='center'>{lang.get('main.title')}</div>
        <div className='right'>
          <ToolbarButton onClick={this._onClickNew.bind(this)}>
            {lang.get('new')}
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  _onPreChangeTab(e) {
    this.setState({
      tabIndex: e.index,
    });
  }

  _renderTabs() {
    const { todoList, filter } = this.props;
    const filteredList = this._filter(todoList, filter);
    return [
      {
        content: <TodoList todoList={filteredList.filter(todo => !todo.completed)} key='pending'/>,
        tab: <Tab label={lang.get('tab.pending')} key='pending'/>,
      },
      {
        content: <TodoList todoList={filteredList.filter(todo => !!todo.completed)} key='completed'/>,
        tab: <Tab label={lang.get('tab.completed')} key='completed'/>,
      },
    ];
  }

  _filter(todoList, filter) {
    switch (filter) {
      case CATEGORY_NONE:
        return todoList.filter(todo => !todo.category);

      case CATEGORY_ALL:
        return todoList;
      default:
        return todoList.filter(todo => todo.category === filter);
    }
  }

  _onClickSideMenu() {
    this.props.openSideMenu();
  }

  _onClickNew() {
    App.openNewTodo();
  }

  static mapStateToProps(state) {
    return {
      todoList: state.todoList,
      filter: state.filter,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      openSideMenu: () => {
        dispatch(ActionCreator.openSideMenu());
      },
      getTodo: () => {
        dispatch(ActionCreator.getTodo());
      },
    };
  }
}

export default connect(MainPage.mapStateToProps, MainPage.mapDispatchToProps)(MainPage);
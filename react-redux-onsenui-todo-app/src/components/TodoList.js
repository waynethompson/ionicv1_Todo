import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreator } from '../ActionCreator';
import {
  Page,
  List,
  ListItem,
  Input,
  Icon,
} from 'react-onsenui';

class TodoList extends Component {
  static propTypes = {
    todoList: React.PropTypes.array.isRequired,
    toggleCompleteTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <Page>
        <List
          dataSource={this.props.todoList}
          renderRow={this._renderRow.bind(this)}/>
      </Page>
    );
  }

  _renderRow(todo) {
    return (
      <ListItem>
        <div className='left'>
          <Input type='checkbox' checked={todo.completed} onClick={this._onClickComplete.bind(this, todo)} />
        </div>
        <div className='center'>
          {todo.task}
        </div>
        <div className='right'>
          <Icon onClick={this._onClickDelete.bind(this, todo)} icon='ion-ios-trash-outline, material:md-delete' />
        </div>
      </ListItem>
    );
  }

  _onClickComplete(todo) {
    this.props.toggleCompleteTodo(todo.id);
  }

  _onClickDelete(todo) {
    this.props.deleteTodo(todo.id);
  }

  static mapStateToProps(state) {
    return {
      isOpenSideMenu: state.isOpenSideMenu,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      toggleCompleteTodo: todoID => {
        dispatch(ActionCreator.toggleCompleteTodo(todoID));
      },
      deleteTodo: todoID => {
        dispatch(ActionCreator.deleteTodo(todoID));
      },
    }
  }
}

export default connect(TodoList.mapStateToProps, TodoList.mapDispatchToProps)(TodoList);
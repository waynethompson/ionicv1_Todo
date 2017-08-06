import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Page,
  List,
  ListItem,
  ListHeader,
  Input,
  Button,
} from 'react-onsenui';
import { connect } from 'react-redux';
import lang from '../lang';
import { ActionCreator } from '../ActionCreator';
import App from '.././App';
import './EditTodo.css';

class EditTodo extends Component {
  static propTypes = {
    saveTodo: React.PropTypes.func.isRequired,
    todo: React.PropTypes.object,
  };

  constructor(props) {
    super();
    if (props.todo) {
      this.state = {
        task: props.todo.task,
        category: props.todo.category,
      };
    } else {
      this.state = {};
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo) {
      this.setState({
        task: nextProps.todo.task,
        category: nextProps.todo.category,
      });
    }
  }

  render() {
    const {
      task,
      category,
    } = this.state;
    return (
      <Page>
        <List>
          <ListHeader>{lang.get('edit-todo.header')}</ListHeader>
          <ListItem>
            <Input value={task} placeholder={lang.get('edit-todo.task')} ref='task' onInput={this._onInputTask.bind(this)}/>
          </ListItem>
          <ListItem>
            <Input value={category} placeholder={lang.get('edit-todo.category')} ref='category'/>
          </ListItem>
        </List>
        <div className='edit-todo__button-container'>
          <Button disabled={!task || !task.length} modifier='large' onClick={this._onClickAdd.bind(this)}>{lang.get('edit-todo.add')}</Button>
        </div>
      </Page>
    );
  }

  _onInputTask(e) {
    const { value } = e.target;
    this.setState({
      task: value,
    });
  }

  _onClickAdd() {
    const taskInput = ReactDOM.findDOMNode(this.refs.task);
    const categoryInput = ReactDOM.findDOMNode(this.refs.category);
    const todo = {
      id: this.props.todo ? this.props.todo.id : null,
      task: taskInput.value,
      category: categoryInput.value,
    };
    this.props.saveTodo(todo);
    App.popPage();
  }

  static mapDispatchToProps(dispatch) {
    return {
      saveTodo: todo => {
        dispatch(ActionCreator.saveTodo(todo));
      },
    }
  }
}
export default connect(EditTodo.mapStateToProps, EditTodo.mapDispatchToProps)(EditTodo);
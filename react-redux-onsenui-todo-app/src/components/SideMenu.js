import React, { Component } from 'react';
import {
  Page,
  List,
  ListItem,
  ListHeader,
  Input,
} from 'react-onsenui';
import { connect } from 'react-redux';
import { ActionCreator, CATEGORY_ALL, CATEGORY_NONE } from '../ActionCreator';
import lang from '../lang';

class SideMenu extends Component {
  static propTypes = {
    filter: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array.isRequired,
    filterTodoByCategory: React.PropTypes.func.isRequired,
    closeSideMenu: React.PropTypes.func.isRequired,
  };

  render() {
    const { categories, filter } = this.props;
    const listItems = categories.map(category => {
      return (
        <ListItem onClick={this._onClickCategory.bind(this, category)}>
          <Input type="radio"checked={filter === category} />
          {category}
        </ListItem>
      );
    });
    return (
      <Page>
        <List>
          <ListHeader>{lang.get('edit-todo.category')}</ListHeader>
          <ListItem onClick={this._onClickCategory.bind(this, CATEGORY_ALL)}>
            <Input type="radio" checked={filter === CATEGORY_ALL} />
            {lang.get('category.all')}
          </ListItem>
          <ListItem onClick={this._onClickCategory.bind(this, CATEGORY_NONE)}>
            <Input type="radio" checked={filter === CATEGORY_NONE} />
            {lang.get('category.none')}
          </ListItem>
          {listItems}
        </List>
      </Page>
    );
  }

  _onClickCategory(category) {
    this.props.filterTodoByCategory(category);
    this.props.closeSideMenu();
  }

  static mapStateToProps(state) {
    const categories = [];
    state.todoList.forEach(todo => {
      if (todo.category && categories.indexOf(todo.category) < 0) {
        categories.push(todo.category);
      }
    });

    return {
      filter: state.filter,
      categories,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      filterTodoByCategory: category => {
        dispatch(ActionCreator.filterTodoByCategory(category));
      },
      closeSideMenu: () => {
        dispatch(ActionCreator.closeSideMenu());
      },
    };
  }
}
export default connect(SideMenu.mapStateToProps, SideMenu.mapDispatchToProps)(SideMenu);

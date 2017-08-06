import React, { Component } from 'react';
import {
  Page,
  Toolbar,
  BackButton,
} from 'react-onsenui';
import lang from '../lang';
import App from '.././App';

class SubPage extends Component {
  static propTypes = {
    child: React.PropTypes.element.isRequired,
  };

  render() {
    return (
      <Page
        renderToolbar={this._renderToolbar.bind(this)}>
        {this.props.child}
      </Page>
    );
  }

  _renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton>{lang.get('back')}</BackButton>
        </div>
      </Toolbar>
    );
  }

  _onClickClose() {
    App.popPage();
  }
}
export default SubPage;
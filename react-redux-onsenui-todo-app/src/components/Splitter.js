import React, { Component } from 'react';
import {
  Page,
  Splitter as SplitterWrapper,
  SplitterSide,
  SplitterContent,
} from 'react-onsenui';
import { connect } from 'react-redux';
import { ActionCreator } from '../ActionCreator';
import MainPage from './MainPage';
import SideMenu from './SideMenu';

class Splitter extends Component {
  static propTypes = {
    isOpenSideMenu: React.PropTypes.bool.isRequired,
    openSideMenu: React.PropTypes.func.isRequired,
    closeSideMenu: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <Page>
        <SplitterWrapper>
          <SplitterSide
            side='left'
            width={200}
            collapse={true}
            isOpen={this.props.isOpenSideMenu}
            onPreClose={this._onPreClose.bind(this)}>
            <SideMenu />
          </SplitterSide>
          <SplitterContent>
            <MainPage />
          </SplitterContent>
        </SplitterWrapper>
      </Page>
    );
  }

  _onPreClose() {
    this.props.closeSideMenu();
  }

  static mapStateToProps(state) {
    return {
      isOpenSideMenu: state.isOpenSideMenu,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      openSideMenu: () => {
        dispatch(ActionCreator.openSideMenu());
      },
      closeSideMenu: () => {
        dispatch(ActionCreator.closeSideMenu());
      },
    }
  }
}
export default connect(Splitter.mapStateToProps, Splitter.mapDispatchToProps)(Splitter);
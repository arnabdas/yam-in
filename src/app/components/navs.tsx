/// <reference path="../../../typings/index.d.ts" />

import { Dispatcher } from 'flux';

import * as React from 'react';

import { Utils } from '../helpers';
import { AppEvent } from '../events/appEvent';

export interface INav {
  id: string,
  displayText: string,
  url?: string
}

export interface INavProps {
  dispatcher: Dispatcher<AppEvent>
}
export interface INavState {
  navs: Array<INav>
}

export class NavPills extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);

    this.state = {
      navs: []
    };
  }

  handleClick(id: string) {
    this.props.dispatcher.dispatch(new AppEvent(id));
    this.makeActive(id);
    return false;
  }

  changeNavs(newNavs: Array<INav>) {
    this.setState({
      navs: newNavs
    });
  }

  makeActive(id: string) {
    $('#header li').removeClass('active');
    $('#header li[data-nav="' + id + '"]').addClass('active');
  }

  componentDidMount() {
    $('#header li:first').addClass('active');
  }

  render() {
    return (
      <ul>
        { this.state.navs.map(function (nav: INav) {
          return (
            <li key={nav.id}>
              <a href="#" className="uppercase" data-nav={ nav.id }
                onClick={ this.handleClick.bind(this, nav.id) }>{nav.displayText}</a>
            </li>
          );
        }.bind(this)) }
      </ul>
    );
  }
}
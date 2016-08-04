/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import { Utils } from '../helpers';

export interface INav {
  id: string,
  displayText: string,
  url?: string
}

export interface INavProps {

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

  // https://discuss.reactjs.org/t/is-this-a-decent-pattern-to-update-parent-state-from-children/560
  handleClick(id: string) {
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
    console.log($('#header li[data-nav="' + id + '"]'));
    $('#header li[data-nav="' + id + '"]').addClass('active');
  }

  componentDidMount() {
    console.log($('#header li:first'));
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
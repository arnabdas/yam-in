/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { YamApp } from './components/yam';
import { Utils } from './helpers';

let accessToken = Utils.get('newAccessToken');

ReactDOM.render(
    <YamApp />,
  document.getElementById("yamIn")
);
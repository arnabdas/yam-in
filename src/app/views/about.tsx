/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class About extends React.Component<{}, {}> {
  render () {
    return (
      <div className="row">
        <div id="header">
          <span className="uppercase page-name">About</span>
        </div>
        <div id="content">
          <div className="about">
            <img src="./img/plugin-logo-default.png" title="Yam'in" />
            <h3>Yam'in</h3>
            <h5><pre>v2.0.0</pre></h5>
            <h5>Yammer plugin for Chrome</h5>

            <p>Yammer plugin for Chrome by Imaginea tries to enrich your enterprise Yammer experience by providing an easy to use UI which compliments the web interface of Yammer and lets you stay connected with your peers from within Chrome.</p>
            <p>For more details, head over to the <a href="http://imaginea.github.io/yam-in/" target="_blank">web page</a></p>
          </div>
        </div>
      </div>
    );
  }
}
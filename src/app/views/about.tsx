/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class About extends React.Component<{}, {}> {
  render () {
    return (
      <div className="row">
        <div id="header">
        </div>
        <div id="content">
          <div className="about">
            <div className="logo"></div>
            <h3>Yam'in</h3>
            <h5><pre>v2.0.0</pre></h5>
            <h5>Yammer plugin for Chrome</h5>

            <div className="tab">
              <div className="pane">
                <p>Yammer plugin for Chrome by Imaginea tries to enrich your enterprise Yammer experience by providing an easy to use UI which compliments the web interface of Yammer and lets you stay connected with your peers from within Chrome.</p>
                <p>For more details, head over to the <a href="http://imaginea.github.io/yam-in/" target="_blank">web page</a></p>
              </div>
              <div className="pane">
                <p>The current development team in alphabetical order:</p>
                <ul>
                  <li>Arnab Das</li>
                  <li>Kiran Danduprolu</li>
                  <li>Krishnamraj Goud</li>
                  <li>Manoj Kumar Padala</li>
                  <li>Mohanraj T</li>
                  <li>Prabin Banka</li>
                  <li>Rishav Kumar Verma</li>
                </ul>
                <p>If you want to contribute to this plugin, you can head over to the <a href="https://github.com/Imaginea/yam-in" target="_blank">Github Repository</a> and pick any one of the pending issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
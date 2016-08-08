/// <reference path="../../../typings/index.d.ts" />

import { endPoints } from './endpoints';
import { Utils } from '../helpers';

let accessToken = Utils.get('newAccessToken');

class CallServerTask {
  constructor(
    public url: string,
    public method: string,
    public data: any,
    public defer: JQueryDeferred<any>
  ) { }
}

class BaseDAO {
  queue: Array<CallServerTask>;
  constructor(private accessToken: string) {
    this.queue = new Array<CallServerTask>();
  }

  private callNext() {
    var self = this;
    var task = self.queue[0];
    $.ajax({
      type: task.method,
      url: task.url,
      beforeSend: function (request) {
        request.setRequestHeader("Authorization", "Bearer " + self.accessToken);
      },
      data: $.extend({}, {}, task.data),
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      }
    }).done(function (data, textStatus, jqXHR) {
      task.defer.resolve(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }).always(function () {
      self.queue.shift();
      if (self.queue.length > 0) {
        self.callNext();
      }
    });
  }

  call(name: string, data: any, parameters?: { [key: string]: string }, urlInputs?: { [key: string]: string }): JQueryPromise<any> {
    let callConf = endPoints[name];

    if (typeof callConf === 'undefined') {
      throw new ReferenceError('Undefined API name.');
    }

    let d = $.Deferred();

    let params = new Array<string>();

    let url = callConf.url;
    // This is costly regarding the space and computation. Use this cautiously
    if (urlInputs) {
      for (var i in urlInputs) {
        if (urlInputs.hasOwnProperty(i)) {
          let r = new RegExp('\{%' + i + '%\}', 'g');
          url = url.replace(r, urlInputs[i]);
        }
      }
    }    

    if (parameters) {
      for (var p in parameters) {
        if (parameters.hasOwnProperty(p)) {
          params.push(p + '=' + parameters[p]);
        }
      }

      if (params.length > 0) {
        url += '?' + params.join('&');
      }
    }

    this.queue.push(new CallServerTask(url, callConf.method, data, d));

    if (this.queue.length === 1) {
      this.callNext();
    }

    return d.promise();
  }
}

let baseDAOInstance = new BaseDAO(accessToken);

export const Server = baseDAOInstance;
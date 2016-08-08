/// <reference path="../../../typings/index.d.ts" />

//// TODO: Cleanup needed

import {Utils} from "../helpers";

export class Reference {
  constructor(
    public id = 0,
    public name = '',
    public network_id = 0,
    public type = '',
    public url = '',
    public web_url = '') { }
}

export class References {
  constructor(public references: Array<Reference>) { }

  getReferenceById(type: string, ref_id: number): Reference {
    var matchedReference = $.grep(this.references, function (reference) {
      return reference.type === type && reference.id == ref_id;
    });

    return matchedReference.length > 0 ? matchedReference[0] : new Reference();
  }
}

export class Stats {
  constructor(
    public followers = 0,
    public following = 0,
    public updates = 0
  ) { }

  static Box(obj: any): Stats {
    if (obj) {
      return new Stats(
        Utils.tryParseNumber(obj.followers),
        Utils.tryParseNumber(obj.following),
        Utils.tryParseNumber(obj.updates));
    }
    return new Stats();
  }
}

export class User extends Reference {
  constructor(
    public permalink = '',
    public user_id = 0,
    public activated_at = '',
    public auto_activated = false,
    public birth_date = '',
    public department = '',
    public email = '',
    public full_name = '',
    public id = 0,
    public interests = '',
    public job_title = '',
    public mugshot_url = 'https://mug0.assets-yammer.com/mugshot/images/48x48/no_photo.png',
    public mugshot_url_template = '',
    public name = '',
    public network_id = 0,
    public location = '',
    public phone_number = '',
    public state = '',
    public stats = new Stats(),
    public summary = '',
    public type = '',
    public url = '',
    public web_url = ''
  ) {
    super(id, name, network_id, type, url, web_url);
  }

  static Box(obj: any): User {
    if (typeof obj !== 'undefined' && ('id' in obj)) {
      let stats = Stats.Box(obj.stats);
      return new User(obj.permalink, obj.user_id, obj.activated_at, obj.auto_activated, obj.birth_date, obj.department,
        obj.email, obj.full_name, obj.id, obj.interests, obj.job_title, obj.mugshot_url, obj.mugshot_url_template,
        obj.name, obj.network_id, obj.location, obj.phone_number, obj.state, stats, obj.summary, obj.type, obj.url, obj.web_url);
    }
    return new User();
  }
}

export class Group extends Reference {
  constructor(
    public color = '',
    public created_at = '',
    public description = '',
    public email = '',
    public external = false,
    public full_name = '',
    public id = 0,
    public members = 0,
    public moderated = false,
    public mugshot_id = '',
    public mugshot_url = '',
    public mugshot_url_template = '',
    public name = '',
    public network_id = 0,
    public privacy = '',
    public show_in_directory = '',
    public type = '',
    public url = '',
    public web_url = ''
  ) {
    super(id, name, network_id, type, url, web_url);
  }

  static Box(obj: any): Group {
    if (typeof obj !== 'undefined' && ('id' in obj)) {
      return new Group(obj.color, obj.created_at, obj.description, obj.email,
        obj.external, obj.full_name, obj.id, obj.members, obj.moderated, obj.mugshot_id,
        obj.mugshot_url, obj.mugshot_url_template, obj.name, obj.network_id, obj.privacy,
        obj.show_in_directory, obj.type, obj.url, obj.web_url);
    }
    return new Group();
  }
}

// [[user:1588562818]] has joined [[group:1532669]]
// [[user:1497198668]] uploaded [[uploaded_file:64426381]]

export class Activity {
  constructor(
    public category = '',
    public created_at = '',
    public message = '',
    public user = new User()
  ) { }

  static Box(obj: any, references?: { [key: string]: {[id: string]: any} }): Activity {
    if (typeof obj !== 'undefined' && ('id' in obj)) {
      let msg: string, user: User;
      if (references) {
        var a = Utils.formatMessage(obj.message, references);
        msg = a.msg;
        user = User.Box(a.relatedObj);
      }
      return new Activity(obj.category, obj.created_at, msg, user);
    }
    return new Activity();
  }
}

export class Image {
  constructor(
    size = 0,
    thumbnail = '',
    url = ''
  ) { }
}

export class Attachment {
  constructor(
    public id = 0,
    public content = '',
    public name = '',
    public network_id = 0,
    public thumbnail_url = '',
    public web_url = ''
  ) { }

  static Box(obj: any): Attachment {
    if (typeof obj === 'Object' && obj !== null) {
      let content: string = obj.inline_html || obj.comment || '';
      return new Attachment(obj.id, content, obj.name, obj.network_id, obj.thumbnail_url, obj.web_url);
    }
    return new Attachment();
  }
}

export class Liked_By {
  constructor(
    public count = 0,
    public names = new Array<User>()
  ) { }

  static Box(obj: any): Liked_By {
    if (typeof obj === 'Object' && obj !== null &&
      typeof obj.names === 'Array' && obj.names.length > 0) {

      let names = obj.names.map(function (name: any) {
        return new User(name.permalink, name.user_id, '', false, '', '', '',
          name.full_name, 0, '', '', '', '', '', name.network_id);
      });
      return new Liked_By(obj.count, names);
    }
    return new Liked_By();
  }
}

export class Message {
  constructor(
    public attachments = new Array<Attachment>(),
    public body = '',
    public chat_client_sequence = '',
    public client_type = '',
    public client_url = '',
    public content_excerpt = '',
    public created_at = '',
    public direct_message = false,
    public group_created_id = 0,
    public group_id = 0,
    public id = 0,
    public language = '',
    public liked_by = new Liked_By(),
    public message_type = '',
    public network_id = 0,
    public notified_user_ids = new Array<number>(),
    public privacy = '',
    public replied_to_id = '',
    public sender_id = 0,
    public sender_type = '',
    public system_message = false,
    public thread_id = 0,
    public url = '',
    public web_url = ''
  ) { }

  static Box(obj: any): Message {
    if (typeof obj !== 'undefined' && ('id' in obj)) {
      let attachments: Array<Attachment>;
      let body: string = obj.body.rich || obj.body.plain || obj.body.plain || '';
      if (typeof obj.attachments === 'Array' && obj.attachments.length > 0) {
        attachments = obj.attachments.map(function (attch: any) {
          return Attachment.Box(attch);
        });
      }
      return new Message(attachments, body, obj.chat_client_sequence,
        obj.client_type, obj.client_url, obj.content_excerpt, obj.created_at,
        obj.direct_message, obj.group_created_id, obj.group_id, obj.id, obj.language, Liked_By.Box(obj.liked_by),
        obj.message_type, obj.network_id, obj.notified_user_ids, obj.privacy, obj.replied_to_id, obj.sender_id,
        obj.sender_type, obj.system_message, obj.thread_id, obj.url, obj.web_url);
    }

    return new Message();
  }
}
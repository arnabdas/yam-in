type EndPoint = {
  method: string;
  url: string;
}

type EndPointMap = {
  [name: string]: EndPoint;
}

export const endPoints: EndPointMap = {
  currentUser: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/users/current.json'
  },
  userProfile: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/users/{%userId%}'
  },
  groupList: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/users/current.json?include_group_memberships=true'
  },
  allFeed: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages.json'
  },
  topFeed: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages/algo.json'
  },
  followingFeed: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages/following.json'
  },
  defaultFeed: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages.json/my_feed.json'
  },
  allGroupFeed: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages/general.json'
  },
  groupFeedById: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages/in_group/{%groupId%}'
  },
  currentNetworkUsers: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/networks/current.json'
  },
  threadById: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/messages/in_thread/{%threadId%}.json'
  },
  search: {
    method: 'GET',
    url: 'https://www.yammer.com/api/v1/search.json'
  }
};
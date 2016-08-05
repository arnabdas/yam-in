# Yam'in
#### Chrome plugin for Yammer

Yam'in was built to increase employee engagement on Yammer by integrating the Yammer experience to the browser in the form of a plugin so they don't have to switch tabs to stay connected to the Enterprise network.

### Features
- Threaded view of conversations
	+ interact with posts with like/unlike, reply and share inline to the thread
	+ look at the current no.of likes, shares and replies to a thread
- All/Top/Following classification as in the web interface for the network feed
- Personal notifications
- Mentions and messages
- Users listing, search and profile view
- Groups listing and message threads within a group
- Enterprise Network Analytics
- Recent Activity within the Enterprise Network
- Search message threads and people 

### Installation

Currently available only for installation in Dev mode

### Installation in Dev Mode

To install in developer mode, follow the steps below.

``` bash
# Clone the Git repo
git clone https://github.com/Imaginea/yam-in.git && cd yam-in

# Checkout dev branch for Version-2
git checkout -b v2 origin/v2

# Install globally
npm install -g typescript typings webpack grunt-cli bower

# Install project dependencies
npm install

# Link globally installed typescript instead of in a local folder
npm link typescript

# Install Ruby and
gem install sass susy normalize-scss bourbon

# Run the default task defined in Gruntfile
grunt 
```

+ Open Chrome *Settings* page, click on *Extensions*
+ Check *Developer mode* check box
+ Click on *Load unpacked extension* and navigate to the \<cloned\>/build folder

*N.B* 

- Any change in `plugin_assets` folder needs to restart `grunt` tasks during development
- It's also possible to directly invoke `webpack` command

### Disclaimer

The base folder structure and setup has been taken from official website of [Typescript](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

Flux implementation has been taken from [sameroom](https://sameroom.io/blog/type-safe-flux-architecture-using-typescript/)

### License
The project is available under MIT License. Find the full license text [here](./LICENSE.md)

### Contributors 
*Listed in alphabetical order*

- Arnab Das
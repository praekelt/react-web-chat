# react-web-chat

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

`react-web-chat` is an instant messaging UI built with React.

# Table of contents

  * [Table of contents](#table-of-contents)
  * [Installation](#installation)
  * [Usage](#usage)
    * [As a stand-alone module](#as-a-stand-alone-module)
    * [As a react component](#as-a-react-component)
  * [Custom events](#custom-events)
    * [Listening](#listening)
    * [As a react component](#dispatching)
* [Custom themes](#custom-themes)
* [Custom network clients](#custom-clients)

Installation
============

Simply install it with your favorite package manager: 

`npm install --save-dev react-web-chat`  
`yarn add react-web-chat`

Usage
============

## As a stand-alone module

The stand-alone version of the module will render to a supplied dom element.  
It accepts the following parameters:

| Argument  | Description | Required | Type |
| ------------- | ------------- | ------------- | --------- |
| url  | The url of your chat server  | yes | String |
| element  | The element `react-web-chat` should render to   | yes | Element |
| theme | A custom [theme](#custom-themes)  | no | Object |
| client | A custom [client](#custom-clients)  | no | Object |

Communication with the module is handled via custom events described [here](#custom-events).

### ES6
```js
import ReactWebChat from 'react-web-chat'
let myChatElement = document.getElementByID('my-chat-element'); 

const reactWebChat = new ReactWebChat({
    url: 'http://localhost:8000',
    element: myChatElement
});
```

### CommonJS
```js
var ReactWebChat = require('react-web-chat').default
var myChatElement = document.getElementByID('my-chat-element'); 

const reactWebChat = new ReactWebChat({
    url: 'http://localhost:8000',
    element: myChatElement
});
```

### UMD
`react-web-chat` is also available as a UMD module. Simply load the module and instantiate a new instance as described in the example below.  
**NOTE: `react` and `react-dom` are peer dependencies so make sure they are loaded too**

```html
<head>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/react-web-chat@1.1.2/umd/react-web-chat.js">
</head>
<html>
    <div id="my-chat-element"> 
</html>
<script>
    var myChatElement = document.getElementByID('my-chat-element'); 

    var reactWebChat = new ReactWebChat.default({
        url: 'http://localhost:8080',
        element: reactWebChat
    });
</script>
```

## As a react component

The exported `ReactWebChatComponent` can be used within an existing react application.  
It accepts the following parameters:

| Argument  | Description | Required | Type |
| ------------- | ------------- | ------------- | --------- |
| url  | The url of your chat server  | yes | String |
| theme | A custom [theme](#custom-themes)  | no | Object |
| client | A custom [client](#custom-clients)  | no | Object |

### Example
```jsx
import { ReactWebChatComponent } from 'react-web-chat'

const MyComponent = props => 
    <div>
        <ReactWebChatComponent url="http://localhost:8080">
    </div>

```

Custom events
============

Communication with the `react-web-chat` module is handled via a series of custom events.

## Listening
Custom `react-web-chat` events are namespaced using the `rwc-` prefix.  
Any dispatched redux action will fire a custom event using the following format:  
`rwc-ACTION_TYPE`

### Example:
```js
window.addEventListener('rwc-MESSAGE_RECEIVE', function(data) {
    // do something with data
});
```
The `data` parameter object adheres to the CustomEvent specification:   
https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

A full list of actions to listen for can be found here:

## Dispatching

Dispatching an event follows the same namespaced convention as described above.
However not all redux actions can be dispatched via custom events.  
Currently only the `MESSAGE_SEND` action type is supported.    
More action types may be supported in future releases if justifiable use cases can be demonstrated. 

### Example:
```js
function sendRWCMessage() {
    var rwcEvent = window.CustomEvent("rwc-MESSAGE_SEND", {
        detail: {
            payload: message
        }
    });
    window.dispatchEvent(rwcEvent);
}

var message = {
    type: 'message',
    layout: 'plain',
    pages: [
        {
            text: 'Hello world'
        }
    ]
}

sendRWCMessage(message);

```

Custom themes
============

`react-web-chat` allows you to inject custom react components for specific parts of the UI.
Any components not specified in the custom theme object will use the default theme's components.

The following components can be overridden:

- AvatarComponent
- ButtonComponent
- CheckboxMenuComponent
- ImageComponent
- InputComponent
- MenuComponent
- TextComponent
- TypingIndicatorComponent

Please see the [API documentation](docs/index.html) for a detailed 

### Example

```jsx
import { ReactWebChatComponent } from 'react-web-chat'

// your custom theme components
import React from 'react';
import Avatar from './customTheme/Avatar';
import Button from './customTheme/Button';
import Input from './customTheme/Input';

const MyComponent = props => 
    <div>
        <ReactWebChatComponent 
            url="http://localhost:8080"
            theme={{
                AvatarComponent: Avatar,
                ButtonComponent: Button,
                InputComponent: Input
            }}
        >
    </div>

```

Custom network clients
============

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/praekelt/react-web-chat/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/praekelt/react-web-chat

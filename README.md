# Google Analytics Task Manager

This guide explains what the `gaTaskManager` plugin is and how to integrate it into your `analytics.js` tracking implementation.

## Overview

Google Analytics [Tasks](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks) is "an advanced feature used to customize how analytics.js validates, constructs, and sends measurement protocol requests". `gaTaskManager` is a Google Analytics plugin which expands analytics.js Tasks, allowing the user to specify multiple functions to be run for each GA Task. Also provides utility functions to add common functions to tasks, such as setting Custom Dimensions. If you want to be able to run multiple functions for one or more Tasks included in the measurement protocol's request lifecycle, this is the plugin for you.

## Usage

To enable the `gaTaskManager` plugin, run the [`require`](https://developers.google.com/analytics/devguides/collection/analyticsjs/using-plugins) command, specify the plugin name `'gaTaskManager'`:

```js
ga('require', 'gaTaskManager');
```

When you require the `gaTaskManager` plugin, its constructor overrides the GA tracker's Tasks' function with its own, and sets the original Task function as the first function to be run for that respective Task. From an output perspective, nothing changes by requiring the plugin, it simply bootstraps the tracker so that you're able to use the methods listed below.

## Methods

The following table lists all methods for the `gaTaskManager` plugin:

<table>
  <tr valign="top">
    <th align="left">Name</th>
    <th align="left">Description</th>
  </tr>
  <tr valign="top">
    <td><code>addFunctionToTask</code></td>
    <td>Adds a function to be executed at the specified GA Task. Can be used to add to any Task listed at https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks</td>
  </tr>
  <tr valign="top">
    <td><code>setCustomDimension</code></td>
    <td>Adds a function which sets a GA Custom Dimension at the specified GA Task execution time. Defaults to execution on the <code>customTask</code> Task</td>
  </tr>
  <tr valign="top">
    <td><code>remove</code></td>
    <td>Removes the <code>gaTaskManager</code> plugin from the specified tracker, restoring all original functions set to each Task prior to the plugin being required.</td>
  </tr>
</table>

For details on how `analytics.js` plugin methods work and how to invoke them, see [calling plugin methods](https://developers.google.com/analytics/devguides/collection/analyticsjs/using-plugins#calling_plugin_methods) in the `analytics.js` documentation.

## Examples

### Setting a Custom Dimension at every hit:

This example sets a Custom Dimension `dimension2` at every Hit: 

```js
  var index = 1;
  ga('gaTaskManager:setCustomDimension', index, 'foo');

```

### Setting Custom Dimension value just-in-time:

This example delegates the generation of the value for the Custom Dimension to a function that returns the current timestamp at every Hit:

```js
  var index = 2;
  ga('gaTaskManager:setCustomDimension', index, function(){ 
    return Date.now() / 1000 | 0; 
  });

```

### Executing an arbitrary function on a Task

This example adds an arbitrary function to be executed after sending the normal request to
request to www.google-analytics.com/collect.

```js
ga('gaTaskManager:addFunctionToTask', function(model) {
  // Send a copy of the request to a local server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/localhits', true);
  xhr.send(model.get('hitPayload'));
});
```
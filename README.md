# SkyBiometry
Face detection and recognition. Node.js wrapper for SkyBiometry API.

[![NPM Version](https://img.shields.io/npm/v/skybiometry.svg)](https://www.npmjs.com/package/skybiometry)
[![Build Status](https://travis-ci.org/martoncsikos/skybiometry.svg?branch=master)](https://travis-ci.org/martoncsikos/skybiometry)
[![Coverage Status](https://coveralls.io/repos/github/martoncsikos/skybiometry/badge.svg)](https://coveralls.io/github/martoncsikos/skybiometry)
[![Dependencies](https://david-dm.org/martoncsikos/skybiometry.svg)](https://david-dm.org/martoncsikos/skybiometry)
[![Known Vulnerabilities](https://snyk.io/test/github/martoncsikos/skybiometry/badge.svg)](https://snyk.io/test/github/martoncsikos/skybiometry)


## Install

```bash
$ npm install skybiometry
```

## Getting started

Create a [SkyBiometry](https://www.skybiometry.com) account and obtain an API Key and API Secret.


```js
const skybiometry = require('skybiometry');
const client = new skybiometry.Client('YOUR_API_KEY', 'YOUR_API_SECRET');
```

## Usage

This module makes requests to the SkyBiometry API. For a more elaborate documentation and details about response format and accepted parameters please consult the [API Reference](https://skybiometry.com/documentation/).

All methods return a **Promise**, that is resolved with the response from the API.
The returned Promises are instances of [request](https://github.com/request/request-promise).

## Methods

* [account](#account)
  * [.users(namespaces)](#usersnamespaces)
  * [.namespaces()](#namespaces)
  * [.limits()](#limits)
  * [.authenticate()](#authenticate)
* [tags](#tags)
  * [.remove(tids[, options])](#removetids-options)
  * [.save(tids, uid[, options])](#savetids-uid-options)
  * [.add(uid, url, tag[, options])](#adduid-url-tag-options)
  * [.get(options)](#getoptions)
* [faces](#faces)
  * [.status(uids[, options])](#statusuids-options)
  * [.train(uids[, options])](#trainuids-options)
  * [.group(uids, options)](#groupuids-options)
  * [.recognize(uids, options)](#recognizeuids-options)
  * [.detect(options)](#detectoptions)

### account

### .users(namespaces)
Returns a list of users that were registered in the specified data namespaces.

Method entry point:
```
http://api.skybiometry.com/fc/account/users
```

**Arguments**
* `namespaces` - a comma separated list of one or more data namespaces.

```js
client.account.users('test_namespace')
.then(result => console.log(result));
```

### .namespaces()

Returns all valid data namespaces for application authorized by the specified api key.

Method entry point:
```
http://api.skybiometry.com/fc/account/namespaces
```

```js
client.account.namespaces()
.then(result => console.log(result));
```
### .limits()

Returns limits/quota usage information for calling application/account.

Method entry point:
```
http://api.skybiometry.com/fc/account/limits
```

```js
client.account.limits()
.then(result => console.log(result));
```
### .authenticate()
Returns authentication status. Method can be used to test connection and/or authentication to the API access point. It is not required to call this method before calling any other API methods.

Method entry point:
```
http://api.skybiometry.com/fc/account/authenticate
```

```js
client.account.authenticate()
.then(result => console.log(result));
```

### tags

### .remove(tids[, options])
Removes a previously saved tag.

Method entry point:
```
http://api.skybiometry.com/fc/tags/remove
```

**Arguments**
* `tids` - one or more tag ids to remove. Tag id is a reference field in the response of [faces.detect](#detectoptions), [faces.recognize](#recognizeuids-options) and [tags.get](#getoptions) methods.
* `options` - *Object*
  * `password` - this method can be password protected if you want to make it an administrative operation. You can specify password in account settings.  

```js
client.tags.remove('tagId1,tagId2', { password: 'optionalPassword' })
.then(result => console.log(result));
```

### .save(tids, uid[, options])
Saves a specified face tag to permanent storage. 

Method entry point:
```
http://api.skybiometry.com/fc/tags/save
```

**Arguments**
* `tids` - one or more tag ids to associate with the specified uid. Tag id is a reference field in the response of [faces.detect](#detectoptions), [faces.recognize](#recognizeuids-options) and [tags.get](#getoptions) methods.
* `uid` - id of the user being tagged (e.g. mark@docs, where mark – is the name of your choice and docs is the name of created data namespace).
* `options` - *Object*
  * `label` – display name of the user being tagged (e.g. First and Last name). Note that this information is saved and can later be retrieved per tag, not per user.
  * `password` – this method can be password protected if you want to make it an administrative operation. You can specify password in account settings.

```js
client.tags.save('tagId1', 'mark@docs', {
  label: 'Mark',
  password: 'optionalPassword',
})
.then(result => console.log(result));
```

### .add(uid, url, tag[, options])
Add face tags manually.

Method entry point:
```
http://api.skybiometry.com/fc/tags/add
```

**Arguments**
* `uid` – id of the user being tagged.
* `url` – url to the image to add the tag to.
* `tag` - *Object*
  * `x` - horizontal center position of the tag, as a percentage from 0 to 100, from the left of the photo.
  * `y` - vertical center position of the tag, as a percentage from 0 to 100, from the left of the photo.
  * `width` - width of the tag, as a percentage from 0 to 100.
  * `height` - height of the tag, as a percentage from 0 to 100.
* `options` - *Object*
  * `label` – display name of the user being tagged (e.g. First and Last name). Note that this information is saved and can later be retrieved per tag, not per user.
  * `password` – this method can be password protected if you want to make it an administrative operation. You can specify password in account settings.

```js
client.tags.add('mark@docs', 'http://www.example.com/photo.jpg', {
  x: 12.5,
  y: 12.5,
  width: 10,
  height: 10,
}, {
  label: 'Mark',
  password: 'optionalPassword',
})
.then(result => console.log(result));
```

### .get(options)
Returns already saved tags.

Method entry point:
```
http://api.skybiometry.com/fc/tags/get
```

**Arguments**

At least one of **options.uids**, **options.pids**, or **options.urls** is required.

* `options` - *Object*
 * **`uids`** – a comma separated list of user ids to get tags for.
 * **`pids`** – a comma separated list of photo ids to get tags for (photo ids are returned for [faces.detect](#detectoptions) and [faces.recognize](#recognizeuids-options)).
 * **`urls`** – a comma separated list of images to get tags for.
 * `limit` – maximum tags to return (default: 5).
 * `together` – when multiple uids are provided, return only tags for photos where all uids appear together in the photo(s) (default: false).
 * `order` – specifies the order of returned tags (recent – for latest tags, random – random selected tags) (default: “recent”).
 * `namespace` – default data namespace to be used for all specified uids without data namespace specified.
 * `filter` – ability to specify facial attributes for filtering the returned tags.

```js
// Get first 20 tags for a specified user in random order
client.tags.get({
  uids: 'mark',
  limit: '20',
  order: 'random',
  namespace: 'docs',
})
.then(result => console.log(result));
```

### faces

### .status(uids[, options])
Returns training status for specified users.

Method entry point:
```
http://api.skybiometry.com/fc/faces/status
```

**Arguments**
* `uids` - a comma separated list of user ids to get training information for.
* `options` - *Object*
  * `namespace` – default data namespace to be used for all specified uids without data namespace specified.  

```js
client.faces.status('mark', { namespace: 'docs' })
.then(result => console.log(result));
```

### .train(uids[, options])
Starts training of specified users. Once the face tags were trained, specified user id can be recognized using [faces.recognize](#recognizeuids-options).

Method entry point:
```
http://api.skybiometry.com/fc/faces/train
```

**Arguments**
* `uids` - a comma separated list of user ids to begin training for.
* `options` - *Object*
  * `namespace` – default data namespace to be used for all specified uids without data namespace specified.  

```js
client.faces.train('mark', { namespace: 'docs' })
.then(result => console.log(result));
```

### .group(uids, options)
Detect, group and optionally recognize one or more user faces in one or more photos. Tries to match all the faces that were found in the images specified, then assigns a group ID for all detected faces that appear to be of the same person.

Method entry point:
```
http://api.skybiometry.com/fc/faces/group
```

**Arguments**
* `uids` - a comma separated list of user ids to search for.

At least one of **options.urls** or **options.files** is required.
* `options` - *Object*
  * **`urls`** – a comma separated list of images .
  * **`files`** - image file as *Buffer* or *ReadStream*. See the [form-data](https://github.com/form-data/form-data) library used by [request](https://github.com/request/request) for futher details. If specified as a *String*, it will be interpreted as a Path to read the file from. Only one file is currently supported.
  * `namespace` – default data namespace to be used for all specified uids without data namespace specified.
  * `detector` – face detection quality attribute. Normal (default) – fast face and attribute detection, aggressive – more accurate and slower face and attribute detection.
  * `attributes` – specifies which attributes will be returned with the results. Accepted values: all, none or a comma separated list of supported attributes.
  * `threshold` – specifies threshold used for tags comparison (minimal confidence value) and splitting faces to groups as a percentage from 0 to 100. Default value is 70.
  * `limit` – specifies maximum number of matches that will be returned with the results. If not specified value of 100 will be used.
  * `return_similarities` – specifies whether for each returned tag similarity with all other tags scores will be returned with the results. Zero scores will be skipped.
  * `detect_all_feature_points` – specifies that all possible feature points are detected if set to true.

```js
// photo as url
client.faces.group('all@docs', { urls: 'http://www.example.com/photo.jpg' })
.then(result => console.log(result));

// photo as file
const fs = require('fs');

client.faces.group('all@docs', { files: fs.createReadStream('./photo.jpg') })
.then(result => console.log(result));
```

### .recognize(uids, options)
Used for recognizing trained users in one or more photos.

Method entry point:
```
http://api.skybiometry.com/fc/faces/recognize
```

**Arguments**
* `uids` - a comma separated list of user ids to search for.

At least one of **options.urls** or **options.files** is required.
* `options` - *Object*
  * **`urls`** – a comma separated list of images .
  * **`files`** - image file as *Buffer* or *ReadStream*. See the [form-data](https://github.com/form-data/form-data) library used by [request](https://github.com/request/request) for futher details. If specified as a *String*, it will be interpreted as a Path to read the file from. Only one file is currently supported.
  * `namespace` – default data namespace to be used for all specified uids without data namespace specified.
  * `detector` – face detection quality attribute. Normal (default) – fast face and attribute detection, aggressive – more accurate and slower face and attribute detection.
  * `attributes` – specifies which attributes will be returned with the results. Accepted values: all, none or a comma separated list of supported attributes.
  * `limit` – specifies maximum number of matches that will be returned with the results. If not specified value of 100 will be used.
  * `detect_all_feature_points` – specifies that all possible feature points are detected if set to true.

```js
// photo as url
client.faces.recognize('all@docs', { urls: 'http://www.example.com/photo.jpg' })
.then(result => console.log(result));

// photo as file
const fs = require('fs');

client.faces.recognize('all@docs', { files: fs.createReadStream('./photo.jpg') })
.then(result => console.log(result));
```

### .detect(options)
Returns tags for detected faces in one or more photos, with geometric information of the tag, eyes, nose and mouth, as well as additional attributes such as gender.

Method entry point:
```
http://api.skybiometry.com/fc/faces/detect
```

**Arguments**
At least one of **options.urls** or **options.files** is required.
* `options` - *Object*
  * **`urls`** – a comma separated list of images .
  * **`files`** - image file as *Buffer* or *ReadStream*. See the [form-data](https://github.com/form-data/form-data) library used by [request](https://github.com/request/request) for futher details. If specified as a *String*, it will be interpreted as a Path to read the file from. Only one file is currently supported.
  * `detector` – face detection quality attribute. Normal (default) – fast face and attribute detection, aggressive – more accurate and slower face and attribute detection.
  * `attributes` – specifies which attributes will be returned with the results. Accepted values: all, none or a comma separated list of supported attributes.
  * `detect_all_feature_points` – specifies that all possible feature points are detected if set to true.

```js
// photo as url
client.faces.detect({ urls: 'http://www.example.com/photo.jpg' })
.then(result => console.log(result));

// photo as file
const fs = require('fs');

client.faces.detect({ files: fs.createReadStream('./photo.jpg') })
.then(result => console.log(result));
```

## Workflow
**Face enrollment steps (in order of calling):**

1. [faces.detect](#detectoptions) – detects faces in specified images, returns face tags (every tag has unique tag id – tid).
2. [tags.save](#savetids-uid-options) – saves specified face tags (by tid) with user specified user id(eg. mark@docs, where docs – data namespace name).
3. [faces.train](#trainuids-options) – checks changes for specified user ids (eg. new tags were added using tags.save or removed using tags.remove) and either creates/updates/removes face template for specified user id from data namespace.

Once the enrollment is complete, specified user can be now recognized using [faces.recognize](#recognizeuids-options).

*Disclaimer: This module is a third-party project and not maintained by SkyBiometry.com.*
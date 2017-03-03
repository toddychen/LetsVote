"use strict"

export default class DataController {

  fetchSurveys(processJSONFunc) {
    fetch(this.constructor.HOST + '/surveys', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then(processJSONFunc)
    .catch((error) => {
      console.error(error)
    });
  }

  createSurvey(survey) {
    console.log('In createSurvey, survey:', survey)

    fetch(this.constructor.HOST + '/survey/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey),
    })
    .catch((error) => {
      console.error(error)
    });
  }


  vote(voteInfo) {
    console.log('In vote, voteInfo:', voteInfo)

    fetch(this.constructor.HOST + '/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteInfo),
    })
    .catch((error) => {
      console.error(error)
    });
  }

  fetchUser(userId, processJSONFunc) {
    let params = {
      'id': userId
    }

    let query = Object.keys(params)
     .map(k => escape(k) + '=' + escape(params[k]))
     .join('&')

    //console.log('url:', this.constructor.HOST + '/user?' + query)
    fetch(this.constructor.HOST + '/user?' + query, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then(processJSONFunc)
    .catch((error) => {
      console.error(error)
    });
  }

  // userUpdateInfo must have id and tags fields.
  updateUser(userUpdateInfo) {
    console.log('In updateUser, userUpdateInfo:', userUpdateInfo)
    //var data = new FormData();
    //data.append( "json", JSON.stringify( userUpdateInfo ) );

    fetch(this.constructor.HOST + '/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userUpdateInfo),
    })
    .catch((error) => {
      console.error(error)
    });
  }

  // imageType: 'profile' or 'survey'
  uploadImage(uriFromCameraRoll, imageName, imageType, processRespTextFunc) {
    var url = this.constructor.HOST + '/image/' + imageType + '/upload'
    var image = {
      uri: uriFromCameraRoll,
      type: 'image/jpeg',
      name: imageName,
    };
    var body = new FormData();
    body.append(imageType, image);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        // responseText is just the image filename. eg: 'profile_yicyahoo.png'.
        console.log('xhr.responseText:', xhr.responseText);
        processRespTextFunc(xhr.responseText);
      }
    }
    xhr.open('POST', url);
    xhr.send(body);

  }

}

// DataController.HOST = 'http://localhost:3000';
DataController.HOST = 'http://speedgreed.corp.ne1.yahoo.com:3000';

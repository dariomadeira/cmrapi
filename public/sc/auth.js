// FUNCIÓN PARA USO MULTIPLE DE PROXYS QUE ROMPEN CORS
function videoHacker(partURL, isType, videoID) {
  var promise = new Promise(function (resolve, reject) {
    var url = partURL +'http://player.vimeo.com/video/'+ videoID +'/config';
    console.log(url);
    $.ajax({
      type: isType,
      url: url,
      success: function(data) {
        resolve(data);
      },
      error: function(xhr, textStatus, error) {
        console.log(xhr.statusText);
        console.log(textStatus);
        console.log(error);
        reject();
      }
    });
  })
  return promise
}

// FUNCION PARA PASAR EL BLOQUEO DE CORS
async function authUrl(videoID) {
  var partURL;
  var isType;
  var data;
  partURL = "https://cmrcors.onrender.com/";
  isType = "POST";
  try {
    data = await videoHacker(partURL, isType, videoID);
  } catch (error) {
    console.log("AUTO thi");
    partURL = "https://thingproxy.freeboard.io/fetch/";
    isType = "GET";
    try {
      data = await videoHacker(partURL, isType, videoID);
    } catch (error) {
      console.log("AUTO any");
      partURL = "https://cors-anywhere.herokuapp.com/";
      isType = "POST";
      try {
        data = await videoHacker(partURL, isType, videoID);
      } catch (error) {
        console.log("AUTO allo");
        partURL = "https://api.allorigins.win/raw?url=";
        isType = "GET";
        try {
          data = await videoHacker(partURL, isType, videoID);
        } catch (error) {
          console.log("AUTO wave");
          partURL = "http://www.whateverorigin.org/get?url=";
          isType = "GET";
          try {
            var contentData = await videoHacker(partURL, isType, videoID);
            data = contentData.contents;
          } catch (error) {
            data = "ERROR";
          }
        }
      }
    }
  }
  return data;
}

// PROCESAR DATOS
function processVideo(data) {
  var length = Object.keys(data.request.files.progressive).length;
  var matriz_vid = new Array();
  for (i = 0; i < length; i++) {
    const video = {
      quality: data.request.files.progressive[i].quality,
      url: data.request.files.progressive[i].url,
      mime: data.request.files.progressive[i].mime
    };
    matriz_vid[i] = video;
  };
  let uniqueArray = Array.from(new Set(matriz_vid.map(JSON.stringify))).map(JSON.parse);
  return uniqueArray;
}
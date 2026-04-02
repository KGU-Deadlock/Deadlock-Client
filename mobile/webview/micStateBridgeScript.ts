export const micStateBridgeScript = `
  (function () {
    if ((window).__RN_MIC_BRIDGE_INSTALLED__) {
      true;
      return;
    }
    (window).__RN_MIC_BRIDGE_INSTALLED__ = true;
    (window).__RN_MIC_ACTIVE_COUNT__ = 0;

    var emitMicState = function () {
      var isOn = (window).__RN_MIC_ACTIVE_COUNT__ > 0;
      window.postMessage(
        {
          type: isOn ? "MIC_STATE_ON" : "MIC_STATE_OFF",
          isMicOn: isOn
        },
        "*"
      );
    };

    var mediaDevices = navigator.mediaDevices;
    if (!mediaDevices || !mediaDevices.getUserMedia) {
      emitMicState();
      true;
      return;
    }

    var originalGetUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);

    mediaDevices.getUserMedia = async function (constraints) {
      var stream = await originalGetUserMedia(constraints);
      var tracks = stream.getAudioTracks ? stream.getAudioTracks() : [];

      if (tracks.length > 0) {
        (window).__RN_MIC_ACTIVE_COUNT__ += tracks.length;
        emitMicState();

        tracks.forEach(function (track) {
          track.addEventListener("ended", function () {
            (window).__RN_MIC_ACTIVE_COUNT__ = Math.max(
              0,
              (window).__RN_MIC_ACTIVE_COUNT__ - 1
            );
            emitMicState();
          });
        });
      }

      return stream;
    };

    emitMicState();
    true;
  })();
`;


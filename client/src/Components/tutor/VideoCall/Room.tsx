import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string  }>();
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 1690846173;
      const serverSecret = "3ea3dbf098eb82ceed4c8fdf154ea4db";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId || "",
        Date.now().toString(),
        "muhzin muhammed"
      );
      const zp = ZegoUIKitPrebuilt?.create(kitToken);

      if (elementRef.current) {
        zp.joinRoom({
          container: elementRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          // Use the correct property name
          showRemoveUserButton: true,
          showTurnOffRemoteCameraButton: true,
          showTurnOffRemoteMicrophoneButton: true,
        });
      }
    };

    myMeeting();
  }, [roomId]);

  return (
    <div className="room-page">
      <div ref={elementRef}></div>
    </div>
  );
};

export default Room;

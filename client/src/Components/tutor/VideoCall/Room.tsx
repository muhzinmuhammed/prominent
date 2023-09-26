import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 26563277;
      const serverSecret = "617e84c3e34c9056fdec8038414a1ee5";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "muhzin sidhiq"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (elementRef.current) {
        zp.joinRoom({
          container: elementRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
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

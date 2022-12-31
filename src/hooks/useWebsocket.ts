import { useRef, useEffect } from "react";

const useWebsocket = () => {
  const ws = useRef<any>(null);

  useEffect(() => {
    ws.current = new WebSocket(
      "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");
    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
    };
  }, []);
  return ws;
};

export default useWebsocket;

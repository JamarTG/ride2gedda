import { useEffect, useRef, useState, useCallback } from "react";

interface WSMessage {
  type: string;
  payload: unknown;
}

export function useWebSocket(url?: string) {
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  
  useEffect(() => {
    setIsConnected(true);

    intervalRef.current = setInterval(() => {
      const types = ["arrival_update", "route_status", "new_report"];
      const type = types[Math.floor(Math.random() * types.length)];

      const msg: WSMessage = {
        type,
        payload:
          type === "arrival_update"
            ? { routeId: "r1", stopId: "s1", estimatedMinutes: Math.floor(Math.random() * 15) + 1 }
            : type === "route_status"
            ? { routeId: "r3", isActive: Math.random() > 0.5 }
            : { reportId: "rep_live", title: "New community update" },
      };
      setLastMessage(msg);
    }, 8000);

    return () => {
      clearInterval(intervalRef.current);
      setIsConnected(false);
    };
  }, [url]);

  const sendMessage = useCallback((_msg: WSMessage) => {
    
  }, []);

  return { lastMessage, isConnected, sendMessage };
}

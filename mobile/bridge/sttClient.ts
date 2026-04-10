import { Client, type IMessage } from "@stomp/stompjs";

const WS_URL = "wss://api.hellocs.site/v1/ws";
const PUBLISH_PATH = "/v1/ws/pub/stt/chunk";
const SUBSCRIBE_PREFIX = "/v1/ws/sub/stt/";

function generateSessionId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface SttChunkResult {
  sessionId: string;
  sequence: number;
  text: string;
  isFinalChunk: boolean;
}

export class SttClient {
  readonly sessionId: string;
  private client: Client;
  private receivedResults = new Map<number, string>();
  private finalSequence = -1;
  private resolveFinal?: (text: string) => void;
  private rejectFinal?: (err: Error) => void;

  constructor() {
    this.sessionId = generateSessionId();
    this.client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 0,
    });
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.onConnect = () => {
        this.client.subscribe(
          `${SUBSCRIBE_PREFIX}${this.sessionId}`,
          (msg: IMessage) => this.handleMessage(msg),
        );
        resolve();
      };
      this.client.onStompError = (frame) => {
        reject(new Error(frame.headers.message ?? "STOMP error"));
      };
      this.client.onWebSocketError = () => {
        reject(new Error("WebSocket connection error"));
      };
      this.client.activate();
    });
  }

  private handleMessage(msg: IMessage): void {
    const result: SttChunkResult = JSON.parse(msg.body);
    this.receivedResults.set(result.sequence, result.text);

    if (result.isFinalChunk) {
      this.finalSequence = result.sequence;
    }

    if (
      this.finalSequence >= 0 &&
      this.receivedResults.size === this.finalSequence + 1
    ) {
      const text = Array.from(
        { length: this.finalSequence + 1 },
        (_, i) => this.receivedResults.get(i) ?? "",
      )
        .filter(Boolean)
        .join(" ");
      this.resolveFinal?.(text);
    }
  }

  sendChunk(audioBase64: string, sequence: number, isFinalChunk: boolean): void {
    this.client.publish({
      destination: PUBLISH_PATH,
      body: JSON.stringify({
        sessionId: this.sessionId,
        sequence,
        audioBase64,
        isFinalChunk,
      }),
    });
  }

  waitForResult(timeoutMs = 60000): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resolveFinal = resolve;
      this.rejectFinal = reject;

      setTimeout(() => {
        reject(new Error("STT_TIMEOUT"));
      }, timeoutMs);
    });
  }

  disconnect(): void {
    this.client.deactivate();
  }
}

type Data = {
  flow: { from: string; to: string; flow: number }[];
  thread: {
    [key: string]: {
      class: string;
      window: number;
    };
  };
  class: {
    [key: number]: string;
  };
  window: {
    [key: number]: string;
  };
};

export default function normalizeForSankey(
  payload: Data
): (string | number)[][] {
  const header = ["From", "To", "Flow", { type: "string", role: "tooltip" }];
  let normalized = payload.flow
    .map((item) => {
      return [
        item.from,
        item.to,
        item.flow,
        `From: ${payload.class[payload.thread[item.from].class]} | ${
          payload.window[payload.thread[item.from].window]
        }<br/>
        To: ${payload.class[payload.thread[item.to].class]} | ${
          payload.window[payload.thread[item.to].window]
        }<br/>
        Flow: ${item.flow}`,
      ];
    })
    .sort((a, b) => a[0] - b[0]);
  normalized.unshift(header);
  return normalized;
}

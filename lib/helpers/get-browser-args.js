import ConfigHelper from "./config-helper";

export default function getBrowserArgs(viewport) {
  const { width, height, userAgent } = ConfigHelper.load("browsers")[viewport];
  const args = [`window-size=${width},${height}`, `user-agent=${userAgent}`];

  if (viewport === "mobile") {
    args.push("use-mobile-user-agent");
  }

  return args;
}

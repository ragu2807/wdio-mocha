export default function customCommands() {
  browser.addCommand(
    "waitForPageTransition",
    (timeoutInterval = 2000, timeout = 60000) => {
      const selector = ".loading-spa";

      browser.waitForExist(selector);
      browser.waitUntil(
        () => browser.isExisting(selector) === false,
        timeout,
        `Page still in transition after ${timeout} ms`,
        timeoutInterval
      );
    }
  );
}

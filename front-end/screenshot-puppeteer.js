const util = require("util");
let exec = require("child_process").exec;
let exec_prom = util.promisify(exec);
const puppeteer = require("puppeteer");

// TODO Screenshot AJAX
(async () => {
  let htmls = await exec_prom("find . -type f -name '*.html'");
  htmls = htmls.stdout.split("\n").filter(n => n !== "");
  const browser = await puppeteer.launch();
  for (let html of htmls) {
    html = `${__dirname}/${html}`;
    const image = `${html}.png`;
    const page = await browser.newPage();
    await page.goto(`file://${html}`, { waitUntil: "domcontentloaded" });
    await page.setViewport({ width: 1440, height: 900 });
    await page.screenshot({ fullPage: true, path: image });
    await page.close();
    console.log(image);
  }
  await browser.close();
})();

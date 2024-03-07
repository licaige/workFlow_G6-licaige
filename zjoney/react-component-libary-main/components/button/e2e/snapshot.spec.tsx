import React from "react";
import ReactDOMServer from "react-dom/server";
import { configureToMatchImageSnapshot } from "jest-image-snapshot";
import Button from "..";
import 'jest-environment-puppeteer';
const toMatchSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshots`,
  customDiffDir: `${process.cwd()}/diffSnapshots`,
});
expect.extend({ toMatchSnapshot });
describe("测试Buttoon快照", () => {
  it("测试快照是否正确", async () => {
    await jestPuppeteer.resetPage();
    await page.goto(`file://${process.cwd()}/tests/index.html`);
    const html = ReactDOMServer.renderToString(<Button>按钮333</Button>);
    await page.evaluate((innerHTML) => {
      document.querySelector("#root").innerHTML = innerHTML;
    }, html);
    const screenshot = await page.screenshot(); //生成一张新的快照
    expect(screenshot).toMatchSnapshot(); //比较 新的快照和老的快照是否相相同
  });
});
//reacdt单元测试 testLibrary  antd

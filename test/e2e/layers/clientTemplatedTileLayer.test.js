const playwright = require("playwright");

jest.setTimeout(50000);
(async () => {

  for (const browserType of BROWSER) {
    let page, browser, context;
    describe(
      "Playwright Client Tile Tests in " + browserType,
      () => {
        beforeAll(async () => {
          browser = await playwright[browserType].launch({
            headless: ISHEADLESS,
            slowMo: 50,
          });
          context = await browser.newContext();
          page = await context.newPage();
          if (browserType === "firefox") {
            await page.waitForNavigation();
          }
          await page.goto(PATH + "clientTemplatedTileLayer.html");
        });

        afterAll(async function () {
          await browser.close();
        });

        test("[" + browserType + "]" + " Custom Tiles Loaded In, Accurate Coordinates", async () => {
          const one = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(1) > p",
            (tile) => tile.textContent
          );
          const two = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(2) > p",
            (tile) => tile.textContent
          );
          const three = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(3) > p",
            (tile) => tile.textContent
          );
          const four = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(4) > p",
            (tile) => tile.textContent
          );
          const five = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(5) > p",
            (tile) => tile.textContent
          );
          const six = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(6) > p",
            (tile) => tile.textContent
          );
          const seven = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(7) > p",
            (tile) => tile.textContent
          );
          const eight = await page.$eval(
            "xpath=//html/body/mapml-viewer >> css=div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > div > div.leaflet-layer.mapml-templatedlayer-container > div > div > div:nth-child(8) > p",
            (tile) => tile.textContent
          );

          expect(one).toEqual("101");
          expect(two).toEqual("001");
          expect(three).toEqual("201");
          expect(four).toEqual("111");
          expect(five).toEqual("011");
          expect(six).toEqual("211");
          expect(seven).toEqual("301");
          expect(eight).toEqual("311");

        });
      });
  }
})();

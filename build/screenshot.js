const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { PDFDocument, StandardFonts } = require("pdf-lib");

module.exports = function () {
  (async () => {
    const browser = await puppeteer.launch({
      args: [
        "--window-size=1280,800",
        '--disable-gpu',
        '--renderer',
        '--no-sandbox',
        '--no-service-autorun',
        '--no-experiments',
        '--no-default-browser-check',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-extensions',
      ],
    });
    const page = await browser.newPage();
    await page.goto(`file:${path.join(__dirname, "../dist/index.html")}`);
    await page._client.send("Emulation.clearDeviceMetricsOverride");
    await page.screenshot({ path: "resume.png" });
    await page.pdf({
      path: "./dist/assets/resume.pdf",
      // path: "./src/assets/resume.pdf",
      printBackground: true,
      format: "letter",
      margin: {
        top: "30px",
        left: "0px",
        right: "0px",
        bottom: "30px",
      },
    });

    await browser.close();

    const readPdf = fs.readFileSync(`./dist/assets/resume.pdf`);
    // const readPdf = fs.readFileSync(`./src/assets/resume.pdf`);
    const pdfDoc = await PDFDocument.load(readPdf, {
      updateMetadata: true,
    });
    pdfDoc.setTitle("Melinda Malmgren - Resume");
    pdfDoc.setAuthor("Melinda Malmgren");
    pdfDoc.setProducer("KH PDF App 9000 🤖");
    pdfDoc.setSubject("Melinda Malmgren Resume");
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync("./dist/assets/resume.pdf", pdfBytes);
    // fs.writeFileSync("./src/assets/resume.pdf", pdfBytes);
    console.log("Wrote PDF");
  })();
};

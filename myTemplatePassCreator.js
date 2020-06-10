import Template from "@walletpass/pass-js";
import fs from "fs";

async function createPass() {
    // console.log('Template', Template);

    // or create it manually
    const template = new Template.Template("coupon", {
        passTypeIdentifier: "pass.com.example.firstwalletpass",
        serialNumber : "E5982H-I2",
        teamIdentifier: "L8JW59293P",
        webServiceURL : "https://example.com/passes/",
        authenticationToken : "vxwxd7J8AlNNFPS8k0a0FfUFtq0ewzFdc",
        backgroundColor: "red",
        sharingProhibited: true,
        organizationName: "Trove",
        barcode : {
            message : "123456789",
            format : "PKBarcodeFormatPDF417",
            messageEncoding : "iso-8859-1"
        },
        coupon : {
            primaryFields : [
              {
                key : "offer",
                label : "Any premium dog food",
                value : "20% off"
              }
            ],
            auxiliaryFields : [
              {
                key : "expires",
                label : "EXPIRES",
                value : "2020-04-24T10:00-05:00",
                isRelative : true,
                dateStyle : "PKDateStyleShort"
              }
            ]
        },
        organizationName : "Paw Planet",
        description : "Paw Planet Coupon",
        logoText : "Paw Planet",
        foregroundColor : "rgb(255, 255, 255)",
        backgroundColor : "rgb(206, 140, 53)",
    }, null, null, null);

    const iconPngFileBuffer = './images/icon.png';
    const pathToLogoPNGfile = './images/logo.png';

    await template.images.add("icon", iconPngFileBuffer);
    await template.images.add("logo", pathToLogoPNGfile);

    const cert = "./certificates/FirstWalletPassCertificate.pem";
    const password = "2!@wdW";
    await template.loadCertificate(
        cert,
        password
    );

    const pass = template.createPass({
        serialNumber: "123456",
        description: "20% off"
    });

    pass.primaryFields.add({ key: "time", label: "Time", value: "10:00AM" });

    const buf = await pass.asBuffer();
    fs.writeFileSync("./pathToPass.pkpass", buf);

}

createPass();
// Update template script

"use strict";

const FS = require("fs")
const Path = require("path");

const templateText = FS.readFileSync(Path.resolve(__dirname, "template.html.txt")).toString();

const templateBase64 = Buffer.from(templateText, 'utf-8').toString('base64');

const scriptResult = `window.TemplateHTML = atob('${templateBase64}');`;

FS.writeFileSync(Path.resolve(__dirname, "template.js"), scriptResult);

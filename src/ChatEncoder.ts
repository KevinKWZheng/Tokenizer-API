import { runScripts } from "./tiktoken/scriptRunner";

process.on(`message`, async (message: {
    text: string,
    encoding: EncodingOptions
}) => {
    if (typeof process.send !== 'undefined')
        process.send(await runScripts(`countToken`, [message.text, message.encoding]));
    process.exit(0);
})


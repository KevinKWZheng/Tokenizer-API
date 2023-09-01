import { exec, fork } from "child_process";
import path from "path";
import { runScripts } from "./tiktoken/scriptRunner";

export class Tokenizer {

    protected encoding: EncodingOptions = `cl100k_base`;

    protected readonly encodingList: EncodingOptions[] = [`cl100k_base`, `p50k_base`, `r50k_base`];

    constructor(encoding?: EncodingOptions) {
        exec(`python -V`, (err, stdout, stderr) => {
            if (err || stderr) throw new Error(`Python environment not detected`);
        });

        exec(`pip list`, (error, stdout, stderr) => {
            if (error) throw new Error(`Pip not available`);

            const packages = stdout.trim().split(`\n`);
            const isInstalled = packages.some(pkg => pkg.startsWith(`tiktoken`));
            if (!isInstalled)
                throw new Error(`tiktoken package not installed`);
        });

        if (encoding)
            if (this.encodingList.includes(encoding))
                this.encoding = encoding;
            else throw new Error(`Encoding ${encoding} not available`);
    }

    public async countToken(text: string, encoding?: EncodingOptions) {
        return await runScripts(`countToken`, [text, encoding ? encoding : this.encoding]) as number;
    }

    public async encodeText(text: string, encoding?: EncodingOptions) {
        return await runScripts(`encodeText`, [text, encoding ? encoding : this.encoding]) as number[];
    }

    public async decodeText(encodedText: number[], encoding?: EncodingOptions) {
        return await runScripts(`decodeText`, [encodedText, encoding ? encoding : this.encoding]) as string;
    }

    public async countChatToken(conversation: {
        role: `system` | `user` | `assistant`,
        content: string
    }[], encoding?: EncodingOptions) {
        return await new Promise(async (resolve, reject) => {
            var counter = 0, total = 0;
            const __filename = new URL(import.meta.url).pathname;
            const __dirname = path.dirname(__filename);
            for (let i in conversation) {
                let child = fork(`${__dirname}/ChatEncoder`);
                child.send({ text: conversation[i].content, encoding: encoding ? encoding : this.encoding });
                child.on(`message`, (message) => {
                    total += JSON.parse(JSON.stringify(message));
                    counter++;
                    if (counter == conversation.length)
                        resolve(total);
                })
                child.on(`error`, (err) => {
                    reject(err);
                });
                if (child.stderr)
                    child.stderr.on(`data`, (data) => {
                        reject(Buffer.from(data).toString(`utf-8`));
                    })

            }
        });
    }

    public async getEncodingByModel(modelName: string) {
        const name = await runScripts(`getEncoding`, [modelName]) as EncodingOptions;
        if (!this.encodingList.includes(name)) throw new Error(`Model ${modelName} not available`);
        return name;
    }

    public getEncodingList() {
        return this.encodingList;
    }

    public async setEncoding(options: {
        encodingName?: EncodingOptions,
        modelName?: string
    }) {
        if (options.modelName)
            this.encoding = await this.getEncodingByModel(options.modelName);

        if (options.encodingName) {
            if (!this.encodingList.includes(options.encodingName))
                throw new Error(`Encoding ${options.encodingName} not available`)
            this.encoding = options.encodingName;
        }
    }
}

export default Tokenizer;
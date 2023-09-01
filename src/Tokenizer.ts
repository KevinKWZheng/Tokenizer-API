import { exec } from "child_process";
import { runScripts } from "./tiktoken/scriptRunner";

export class Tokenizer {
    constructor() {
        exec(`python -V`, (err, stdout, stderr) => {
            if (err || stderr) throw new Error(`Python environment not detected`);
        });

        exec(`pip list`, (error, stdout, stderr) => {
            if (error) throw new Error(`Pip not available`);

            const packages = stdout.trim().split(`\n`);
            const isInstalled = packages.some(pkg => pkg.startsWith(`tiktoken`));
            if (!isInstalled)
                throw new Error(`tiktoken package not installed`);
        })
    }

    public async countToken(text: string, encoding = `cl100k_base`) {
        return await runScripts(`countToken`, [text, encoding]);
    }
}
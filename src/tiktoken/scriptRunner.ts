import { spawn } from "child_process";
import path from "path";

export function runScripts(functionName: string, param: any[]) {
    return new Promise((resolve, reject) => {
        const __filename = new URL(import.meta.url).pathname;
        const __dirname = path.dirname(__filename);
        const parameters = [`${__dirname}/scripts/${functionName}.py`];

        for (const i in param) {
            parameters.push(JSON.stringify(param[i]));
        }

        const python = spawn(`python`, parameters);

        python.stdout.on(`data`, (data) => {
            resolve(JSON.parse(data));
        })

        python.stderr.on(`data`, (buffer) => {
            reject(Buffer.from(buffer).toString(`utf-8`));
        })
    })
}
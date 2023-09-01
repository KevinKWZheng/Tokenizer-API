declare module "tokenizer-api" {
    export class Tokenizer {

        /**
         * 
         * @param encoding Optional. Specify your default encoding 
         */
        constructor(encoding?: EncodingOptions)

        public countToken(text: string, encoding?: EncodingOptions): Promise<number>;

        public encodeText(text: string, encoding?: EncodingOptions): Promise<number[]>;

        public decodeText(encodedText: number[], encoding?: EncodingOptions): Promise<string>;

        public countChatToken(conversation: {
            role: `system` | `user` | `assistant`,
            content: string
        }[], encoding?: EncodingOptions): Promise<number>;

        public getEncodingByModel(modelName: string): Promise<string>;

        public getEncodingList(): string[];

        public setEncoding(options: {
            encodingName?: EncodingOptions,
            modelName?: string
        }): Promise<void>;
    }
}

type EncodingOptions = `cl100k_base` | 'p50k_base' | 'r50k_base';

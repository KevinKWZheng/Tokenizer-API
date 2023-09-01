# LLM-Tokenizer

 A simple and minimalized TS port for using OpenAI's Python pack tiktoken. It is essentially a script runner for OpenAI's `tiktoken` package with TS. Hence, running this package requires you to have a Python runtime environment and `tiktoken` package installed.

 **You will need a Python runtime envrionment and `tiktoken` package installed in order to make this package work.**

To install this package, run `npm i llm-tokenizer`.

## Usage

```typescript
import Tokenizer from "llm-tokenizer";

const tokenizer=new Tokenizer();

const result1=await tokenizer.countToken(`tiktoken is great!`);
// Output: 6

const result2=await tokenizer.encode(`tiktoken is great!`);
// Output: [83, 1609, 5963, 374, 2294, 0]

const result3=await tokenizer.decode([83, 1609, 5963, 374, 2294, 0]);
// Output: `tiktoken is great!`
```

Additionally, you could specify which encoding to defaultly use or for temporary usage by setting the `encoding` option in the constructor or `setEncoding` method.

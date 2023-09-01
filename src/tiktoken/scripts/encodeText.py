import sys
import json
import tiktoken


def encodeText(text: str, encoding: str):
    encoder = tiktoken.get_encoding(encoding)
    return encoder.encode(text)


if __name__ == "__main__":
    text = json.loads(sys.argv[1])
    encoding = None

    if len(sys.argv) > 2:
        print(json.dumps(encodeText(text, json.loads(sys.argv[2]))))
    else:
        print(json.dumps(encodeText(text)))

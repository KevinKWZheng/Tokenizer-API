import sys
import json
import tiktoken


def decodeText(encoded_text: list[int], encoding: str):
    encoder = tiktoken.get_encoding(encoding)
    return encoder.decode(encoded_text)


if __name__=="__main__":
    encoded = json.loads(sys.argv[1])
    encoding = None

    if len(sys.argv) > 2:
        print(json.dumps(decodeText(encoded, json.loads(sys.argv[2]))))
    else:
        print(json.dumps(decodeText(encoded)))
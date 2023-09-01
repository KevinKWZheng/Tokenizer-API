import sys
import json
import tiktoken


def count_tokens(text: str, encoding_name: str = "cl100k_base"):
    encoding = tiktoken.get_encoding(encoding_name)
    return len(encoding.encode(text))


if __name__ == "__main__":
    text = json.loads(sys.argv[1])
    encoding = None

    if len(sys.argv) > 2:
        print(json.dumps(count_tokens(text, json.loads(sys.argv[2]))))
    else:
        print(json.dumps(count_tokens(text)))

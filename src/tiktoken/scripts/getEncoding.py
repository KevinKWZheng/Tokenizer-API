import sys
import json
import tiktoken


def getEncoding(model_name):
    encoding = tiktoken.encoding_for_model(model_name=model_name)
    return encoding.name


if __name__ == "__main__":
    model_name = json.loads(sys.argv[1])

    print(json.dumps(getEncoding(model_name=model_name)))
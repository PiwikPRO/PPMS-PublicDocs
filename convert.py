"""
Compiles multiple YAML files into a single JSON by expanding $ref tags. Writes
compiled content to stdout.
"""
import argparse
import json
import os.path

import yaml


def load(path):
    with open(path) as f:
        return resolve(yaml.safe_load(f.read()), os.path.dirname(path))


def resolve(content, dir):
    if isinstance(content, dict):
        if '$ref' in content and not content['$ref'].startswith('#'):
            path = content['$ref']
            del content['$ref']
            content.update(load(os.path.join(dir, path)))
        else:
            for value in content.values():
                resolve(value, dir)
    return content


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='OpenAPI Build')
    parser.add_argument('--path', type=str, required=True,
                        help='Path to the OpenAPI index file')
    args = parser.parse_args()
    print(json.dumps(load(os.path.realpath(args.path))))
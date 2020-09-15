"""
Compiles multiple YAML files into a single JSON by expanding $ref tags. Writes
compiled content to stdout.
"""
import argparse
import json
import os.path
import sys

import yaml

parsers = {
    '.yaml': yaml.safe_load,
    '.json': json.loads,
}




def load(path):
    _, extension = os.path.splitext(path)
    parse = parsers.get(extension)

    if parse is None:
        raise NotImplementedError('No parser specified for this file type', path)

    with open(path) as f:
        return resolve(parse(f.read()), os.path.dirname(path))


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


def write_open_api_json(path, file_handler, version=None):
    specs = load(os.path.realpath(path))

    if version is not None:
        specs['info']['version'] = version

    file_handler.write(json.dumps(specs, default=str))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='OpenAPI Build')
    parser.add_argument('path', type=str,
                        help='Path to the OpenAPI index file')
    args = parser.parse_args()
    write_open_api_json(args.path, sys.stdout)

"""
Compiles multiple YAML files into a single JSON by expanding $ref tags. Writes
compiled content to stdout.
"""
import argparse
import json
import os.path
import sys
import re
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


def load_content(path):
    _, extension = os.path.splitext(path)
    parse = parsers.get(extension)

    if parse is None:
        raise NotImplementedError('No parser specified for this file type', path)

    with open(path) as f:
        return parse(f.read()), os.path.dirname(path)


def search(content, ref):
    path = ref.lstrip('/').split('/')

    while len(path):
        key = path.pop(0)
        content = content[key]

    return content


def resolve_local(content, src=None):
    if src is None:
        src = content

    if isinstance(content, dict):
        if '$ref' in content and content['$ref'].find('#') == 0:
            path, ref = re.sub('^\./', '', content['$ref']).split('#')
            content.update(search(src, ref))
            del content['$ref']
        else:
            for value in content.values():
                resolve_local(value, src)
    elif isinstance(content, list):
        for value in content:
            resolve_local(value, src)

    return content


def resolve(content, dir):
    if isinstance(content, dict):
        if '$ref' in content and not '#' in content['$ref']:
            path = re.sub('^\./', '', content['$ref'])
            del content['$ref']
            content.update(load(os.path.realpath(os.path.join(dir, path))))
        elif '$ref' in content and content['$ref'].find('#') > 0:
            path, ref = re.sub('^\./', '', content['$ref']).split('#')
            file_path = os.path.realpath(os.path.join(dir, path))
            tmp = load_content(file_path)
            content.update(resolve(search(resolve_local(tmp[0]), ref), os.path.dirname(file_path)))
            del content['$ref']
        elif 'externalValue' in content:
            path = re.sub('^\./', '', content['externalValue'])
            del content['externalValue']
            content.update({'value': load(os.path.realpath(os.path.join(dir, path)))})
        else:
            for value in content.values():
                resolve(value, dir)
    elif isinstance(content, list):
        for value in content:
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

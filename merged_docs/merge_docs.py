import json
import os

docs = [
    "../platform/authorized_api/access_control/public_v2.yaml",
    "../platform/authorized_api/apps/public_v2.yaml",
    "../platform/authorized_api/audit_log/public_v1.yaml",
    "../platform/authorized_api/container_settings/src/settings.yaml",
    "../platform/authorized_api/meta_sites/public_v1.yaml",
    "../platform/authorized_api/modules/public_v1.yaml",
    "../platform/authorized_api/tracker_settings/public_v2.yaml",
    "../platform/authorized_api/user_groups/public_v1.yaml",
    "../platform/authorized_api/users/public_v2.yaml",
    "../tag_manager/authorized_api/src/changelog.yaml",
    "../tag_manager/authorized_api/src/operations.yaml",
    "../tag_manager/authorized_api/src/tags.yaml",
    "../tag_manager/authorized_api/src/variables.yaml",
    "../tag_manager/authorized_api/src/versions.yaml",
    "../custom_reports/http_api/index.yaml",
    "../custom_reports/object_management_api/index.yaml"
]

MERGED_DIR = './merged'


def bundle_openapi_doc(filename: str):
    outfile = filename.replace('../', '').replace('/', '_')
    os.system(f"swagger-cli bundle {filename} --outfile {MERGED_DIR}/{outfile} --type yaml")
    return outfile


openapi_merge_config = {
    "inputs": [],
    "output": "./output.swagger.json"
}
for doc in docs:
    bundled_doc = bundle_openapi_doc(doc)
    openapi_merge_config['inputs'].append({"inputFile": f"{MERGED_DIR}/{bundled_doc}"})

with open('openapi-merge.json', 'w') as f:
    json.dump(openapi_merge_config, f, indent=2)

os.system("npx openapi-merge-cli")

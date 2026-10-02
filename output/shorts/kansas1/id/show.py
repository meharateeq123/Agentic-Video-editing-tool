import json, glob
for f in sorted(glob.glob('s_*.json')):
    print('==', f)
    d = json.load(open(f, encoding='utf-8-sig'))
    for pg in sorted(d['query']['pages'].values(), key=lambda x: x['index']):
        ii = pg['imageinfo'][0]; m = ii.get('extmetadata', {})
        print(pg['title'], ii['width'], 'x', ii['height'], '|', m.get('LicenseShortName', {}).get('value'), '|', (m.get('ImageDescription', {}).get('value') or '')[:60].replace('\n', ' '))

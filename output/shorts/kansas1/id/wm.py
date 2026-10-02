import json, urllib.request, urllib.parse, sys
H = {'User-Agent': 'flick-shorts/1.0 (personal video project)'}
def api(**p):
    p['format'] = 'json'
    r = urllib.request.Request('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(p), headers=H)
    return json.load(urllib.request.urlopen(r, timeout=30))
for q in ['Kyle Larson', 'Denny Hamlin']:
    print('==', q)
    d = api(action='query', generator='search', gsrsearch=q, gsrnamespace=6, gsrlimit=20, prop='imageinfo', iiprop='url|size|extmetadata', iiurlwidth=400)
    for pg in sorted(d['query']['pages'].values(), key=lambda x: x['index']):
        ii = pg['imageinfo'][0]
        m = ii.get('extmetadata', {})
        print(pg['title'], ii['width'], 'x', ii['height'], '|', m.get('LicenseShortName', {}).get('value'), '|', (m.get('ImageDescription', {}).get('value') or '')[:70].replace('\n', ' '))

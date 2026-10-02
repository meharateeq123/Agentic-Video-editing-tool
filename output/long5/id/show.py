import json, glob
for f in sorted(glob.glob('id/*.json')):
    d = json.load(open(f, encoding='utf-8-sig'))
    for pg in d['query']['pages'].values():
        o = pg.get('original', {})
        print(pg['title'], '|', pg.get('pageimage'), '|', o.get('width'), o.get('height'), '|', o.get('source'))

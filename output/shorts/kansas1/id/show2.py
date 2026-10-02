import json
for t in ['Kyle_Larson','Denny_Hamlin']:
    d = json.load(open(t + '.json', encoding='utf-8-sig'))
    for pg in d['query']['pages'].values():
        print('==', pg['title'], '| lead:', pg.get('pageimage'), '|', pg.get('original', {}).get('source'), pg.get('original', {}).get('width'), pg.get('original', {}).get('height'))
        for im in pg.get('images', []):
            n = im['title']
            if n.lower().endswith(('.jpg', '.jpeg', '.png')) and 'icon' not in n.lower() and 'logo' not in n.lower() and 'flag' not in n.lower():
                print('   ', n)

import assert from 'node:assert/strict';
const base=process.env.IDENTITY_TEST_URL||'http://127.0.0.1:3010';
const canonical='https://bebin-tech.vercel.app';
const response=await fetch(base);
assert.equal(response.status,200);
const html=await response.text();
assert.ok(html.includes('name="google-site-verification" content="0TXbsBa2FcHmQusQslvk7IGzQTeaNZ_O51F5AX3kLGU"'));
const graphs=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const entities=graphs.flatMap(g=>g['@graph']||[g]);
const person=entities.find(e=>e['@type']==='Person');
const company=entities.find(e=>e['@type']==='Organization');
const profile=entities.find(e=>e['@type']==='ProfilePage');
assert.equal(person.name,'Bebin R');
assert.equal(person['@id'],'https://bebin-tech-projects.vercel.app/bebin-r#person');
assert.equal(person.worksFor['@id'],company['@id']);
assert.equal(company.founder['@id'],person['@id']);
assert.equal(profile.mainEntity['@id'],person['@id']);
assert.equal(profile.primaryImageOfPage['@id'],person.image['@id']);
assert.equal(person.image.contentUrl,canonical+'/images/bebin-r-portrait.png');
assert.equal(person.image.about['@id'],person['@id']);
assert.equal(person.mainEntityOfPage['@id'],profile['@id']);
assert.equal(person.image.width,660);
assert.equal(person.image.height,652);
assert.ok(person.sameAs.includes('https://github.com/Bebin-Tech'));
assert.ok(!person.award,'Do not invent awards');
assert.ok(html.includes('href="https://bebin-tech-projects.vercel.app/bebin-r"'));
assert.ok(html.includes('Founder of Bebin Tech'));
assert.ok(html.includes('max-image-preview:large'));
assert.equal(new URL(html.match(/rel="canonical" href="([^"]+)"/)?.[1]).href,canonical+'/');
const portrait=await fetch(base+'/images/bebin-r-portrait.png');assert.equal(portrait.status,200);assert.match(portrait.headers.get('content-type')||'',/image/);
const imageUrl=html.match(/property="og:image" content="([^"]+)"/)?.[1];
assert.ok(imageUrl,'Social preview image');
assert.equal(imageUrl,person.image.contentUrl,'Use the actual portrait, not a generated text card');
assert.equal(html.match(/name="twitter:image" content="([^"]+)"/)?.[1],imageUrl);
assert.equal([...html.matchAll(/property="og:image" content=/g)].length,1,'No competing OG image');
assert.ok(html.includes('<figcaption><div class="profile-caption">'));
const share=await fetch(base+new URL(imageUrl).pathname);assert.equal(share.status,200);assert.match(share.headers.get('content-type')||'',/image\/png/);
assert.ok((await share.arrayBuffer()).byteLength>10000,'Portrait preview contains image content');
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
assert.ok(sitemap.includes('<image:loc>'+person.image.contentUrl+'</image:loc>'));
for(const oldPath of ['/opengraph-image','/twitter-image']){
  const redirect=await fetch(base+oldPath+'?legacy=1',{redirect:'manual'});
  assert.equal(redirect.status,308);
  assert.equal(new URL(redirect.headers.get('location'),base).pathname,'/images/bebin-r-portrait.png');
}
assert.ok(sitemap.includes(canonical+'/writing/kahe-task-workflow'));
const robots=await (await fetch(base+'/robots.txt')).text();assert.ok(robots.includes('Sitemap: '+canonical+'/sitemap.xml'));
console.log('Identity checks passed: linked Person and Organization, profile, portrait preview, canonicals, official links, sitemap and robots.');

for(const path of ['/images/bebin-r.png','/images/bebin.jpg','/images/avatar.jpg','/images/profile.png']){
 for(const old of [path,'/_next/image?url='+encodeURIComponent(path)+'&w=640&q=75']){
  const response=await fetch(base+old,{redirect:'manual'});assert.equal(response.status,308,'Retired portrait redirect '+old);
  assert.equal(new URL(response.headers.get('location'),base).pathname,'/images/bebin-r-portrait.png');
 }
}
console.log('All retired portrait files and optimized variants redirect to the current photo.');

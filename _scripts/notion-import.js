const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const yaml = require('js-yaml');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

function escapeCodeBlock(body) {
  const regex = /```([\s\S]*?)```/g;
  return body.replace(regex, function (match, htmlBlock) {
    return '\n{% raw %}\n```' + htmlBlock.trim() + '\n```\n{% endraw %}\n';
  });
}

function replaceTitleOutsideRawBlocks(body) {
  const rawBlocks = [];
  const placeholder = '%%RAW_BLOCK%%';
  body = body.replace(/{% raw %}[\s\S]*?{% endraw %}/g, (match) => {
    rawBlocks.push(match);
    return placeholder;
  });

  const regex = /\n#[^\n]+\n/g;
  body = body.replace(regex, function (match) {
    return '\n' + match.replace('\n#', '\n##');
  });

  rawBlocks.forEach((block) => {
    body = body.replace(placeholder, block);
  });

  return body;
}

const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  const root = '_posts/notion';
  fs.mkdirSync(root, { recursive: true });

  const templatePath = path.join('assets', 'template.md');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const templateFm = yaml.load(templateContent.split('---')[1].trim());

  const databaseId = process.env.DATABASE_ID;
  let response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
  });

  const pages = response.results;
  while (response.has_more) {
    const nextCursor = response.next_cursor;
    response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: nextCursor,
      filter: {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
    });
    pages.push(...response.results);
  }

  for (const r of pages) {
    const id = r.id;
    let frontmatter = { ...templateFm };

    // date
    let date = moment(r.created_time).format('YYYY-MM-DD');
    let pdate = r.properties?.['date']?.['date']?.['start'];
    if (pdate) {
      date = moment(pdate).format('YYYY-MM-DD');
    }
    frontmatter.date = date;

    // title
    let title = id;
    let ptitle = r.properties?.['title']?.['title'];
    if (ptitle?.length > 0) {
      title = ptitle[0]?.['plain_text'];
    }
    frontmatter.title = title;
    frontmatter['image-path'] = `/assets/img/${title.replaceAll(' ', '-')}`;

    // description
    let pdesc = r.properties?.['description']?.['rich_text'];
    if (pdesc?.length > 0) {
      frontmatter.description = pdesc[0]?.['plain_text'];
    }

    // tags
    let tags = [];
    let ptags = r.properties?.['tags']?.['multi_select'];
    for (const t of ptags) {
      const n = t?.['name'];
      if (n) {
        tags.push(n);
      }
    }
    if (tags.length > 0) {
      frontmatter.tags = tags;
    }

    // categories
    let cats = [];
    let pcats = r.properties?.['categories']?.['multi_select'];
    for (const t of pcats) {
      const n = t?.['name'];
      if (n) {
        cats.push(n);
      }
    }
    if (cats.length > 0) {
      frontmatter.categories = cats;
    }

    // pin
    frontmatter.pin = r.properties?.['pin']?.['checkbox'] || false;
    // math
    frontmatter.math = r.properties?.['math']?.['checkbox'] || false;
    // mermaid
    frontmatter.mermaid = r.properties?.['mermaid']?.['checkbox'] || false;
    // published
    frontmatter.published = r.properties?.['published']?.['checkbox'] || false;
    // private
    frontmatter.private = r.properties?.['private']?.['checkbox'] || false;

    // image
    let pimage = r.properties?.['image']?.['files'];
    if (pimage?.length > 0) {
      const imageUrl =
        pimage[0]?.['file']?.['url'] || pimage[0]?.['external']?.['url'];
      if (imageUrl) {
        const imageName = path.basename(new URL(imageUrl).pathname);
        const imagePath = path.join(frontmatter['image-path'], imageName);
        frontmatter.image.path = imagePath;
        frontmatter.image.alt = title;

        const localImagePath = path.join(
          'assets/img',
          title.replaceAll(' ', '-'),
          imageName
        );
        const dirname = path.dirname(localImagePath);
        if (!fs.existsSync(dirname)) {
          fs.mkdirSync(dirname, { recursive: true });
        }

        axios({
          method: 'get',
          url: imageUrl,
          responseType: 'stream',
        })
          .then(function (response) {
            response.data.pipe(fs.createWriteStream(localImagePath));
          })
          .catch(function (error) {
            console.log('Image download error:', error);
          });
      }
    } else {
      delete frontmatter.image;
    }

    const fm = `---\n${yaml.dump(frontmatter)}---`;

    const mdblocks = await n2m.pageToMarkdown(id);
    let md = n2m.toMarkdownString(mdblocks)['parent'];
    if (md === '') {
      continue;
    }
    md = escapeCodeBlock(md);
    md = replaceTitleOutsideRawBlocks(md);

    const ftitle = `${date}-${title.replaceAll(' ', '-')}.md`;

    let index = 0;
    let edited_md = md.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      function (match, p1, p2, p3) {
        const dirname = path.join(`/assets/img/${title.replaceAll(' ', '-')}`);
        if (!fs.existsSync(dirname)) {
          fs.mkdirSync(dirname, { recursive: true });
        }
        const filename = path.join(dirname, `${index}.png`);

        axios({
          method: 'get',
          url: p2,
          responseType: 'stream',
        })
          .then(function (response) {
            let file = fs.createWriteStream(`${filename}`);
            response.data.pipe(file);
          })
          .catch(function (error) {
            console.log(error);
          });

        let res;
        if (p1 === '') res = '';
        else res = `_${p1}_`;

        return `![${index++}](/${filename})${res}`;
      }
    );

    fs.writeFile(path.join(root, ftitle), fm + '\n\n' + edited_md, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
})();

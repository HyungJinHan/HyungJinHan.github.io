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
  const regex = /^(\s*)```([\s\S]*?)```/gm;
  return body.replace(regex, function (match, leadingSpaces, htmlBlock) {
    return leadingSpaces + '```' + htmlBlock + '```\n';
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

function processTableAlignment(md) {
  const tableBlocks = md.split('\n\n');
  const newBlocks = [];

  for (const block of tableBlocks) {
    if (block.startsWith('|')) {
      const rows = block.split('\n');
      if (rows.length < 2) {
        newBlocks.push(block);
        continue;
      }

      const header = rows[0];
      const separator = rows[1];

      if (!separator.includes('---')) {
        newBlocks.push(block);
        continue;
      }

      const headers = header.split('|').map(h => h.trim()).slice(1, -1);
      const newHeaders = [];
      const alignments = [];
      const alignRegex = /\{(\.(left|center|right))\}/;

      let hasAlignment = false;
      for (const h of headers) {
        const match = h.match(alignRegex);
        if (match) {
          hasAlignment = true;
          const align = match[2];
          newHeaders.push(h.replace(alignRegex, '').trim());
          if (align === 'left') {
            alignments.push(':---');
          } else if (align === 'center') {
            alignments.push(':---:');
          } else if (align === 'right') {
            alignments.push('---:');
          }
        } else {
          newHeaders.push(h);
          alignments.push('---');
        }
      }

      if (hasAlignment) {
        const newHeaderRow = `| ${newHeaders.join(' | ')} |`;
        const newSeparatorRow = `| ${alignments.join(' | ')} |`;
        const newTable = [newHeaderRow, newSeparatorRow, ...rows.slice(2)].join('\n');
        newBlocks.push(newTable);
      } else {
        newBlocks.push(block);
      }
    } else {
      newBlocks.push(block);
    }
  }
  return newBlocks.join('\n\n');
}

const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  const root = '_posts/notion-post';
  fs.mkdirSync(root, { recursive: true });

  const existingFiles = fs
    .readdirSync(root)
    .filter((file) => file.endsWith('.md'));
  const processedFiles = [];

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
    let file_date = moment(r.created_time).format('YYYY-MM-DD');
    let fm_date = moment(r.created_time).format('YYYY-MM-DD HH:mm:ss');
    let pdate = r.properties?.['date']?.['date']?.['start'];
    if (pdate) {
      file_date = moment(pdate).format('YYYY-MM-DD');
      fm_date = moment(pdate).format('YYYY-MM-DD HH:mm:ss');
    }
    frontmatter.date = fm_date;

    // title
    let title = id;
    let ptitle = r.properties?.['title']?.['title'];
    if (ptitle?.length > 0) {
      title = ptitle[0]?.['plain_text'];
    }
    frontmatter.title = title;
    frontmatter['image-path'] = `/assets/img/notion-post/${title.replaceAll(
      ' ',
      '-'
    )}`;

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
    // done
    frontmatter.done = r.properties?.['done']?.['checkbox'] || false;

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
          'assets/img/notion-post',
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
    md = md.replaceAll('“', '"');
    md = md.replaceAll('”', '"');
    md = md.replaceAll('’', "'");
    md = md.replaceAll('‘', "'");
    md = md.replaceAll('undefined', '');
    md = processTableAlignment(md);

    // Fix for underline and bold nesting
    md = md.replaceAll('<u>**', '**<u>');
    md = md.replaceAll('**</u>', '</u>**');

    const ftitle = `${file_date}-${title.replaceAll(' ', '-')}.md`;
    processedFiles.push(ftitle);

    let index = 0;
    let edited_md = md.replace(
      /!\[(.*?)\]\((.*?)\)/g,
      function (match, caption_text, imageUrl) {
        const dirname = path.join(
          'assets/img/notion-post',
          title.replaceAll(' ', '-')
        );
        if (!fs.existsSync(dirname)) {
          fs.mkdirSync(dirname, { recursive: true });
        }
        const filename = path.join(dirname, `${index}.png`);

        axios({
          method: 'get',
          url: imageUrl,
          responseType: 'stream',
        })
          .then(function (response) {
            let file = fs.createWriteStream(`${filename}`);
            response.data.pipe(file);
          })
          .catch(function (error) {
            console.log(error);
          });

        const imageIndex = index++;
        const localImagePath = `/${filename}`;

        const trimmedCaption = caption_text.trim();
        if (trimmedCaption.startsWith('.')) {
          const parts = trimmedCaption.split(' ');
          const className = parts[0].substring(1);
          const altText = parts.slice(1).join(' ');
          return `<img src="${localImagePath}" alt="${
            altText || 'image-' + imageIndex
          }" class="${className}">`;
        } else {
          let caption = '';
          if (caption_text !== '') {
            caption = `_${caption_text}_`;
          }
          return `![${imageIndex}](${localImagePath})${caption}`;
        }
      }
    );

    try {
      fs.writeFileSync(path.join(root, ftitle), fm + '\n\n' + edited_md);
    } catch (err) {
      console.log(err);
    }
  }

  const filesToDelete = existingFiles.filter(
    (file) => !processedFiles.includes(file)
  );

  for (const file of filesToDelete) {
    try {
      // Delete markdown file
      fs.unlinkSync(path.join(root, file));
      console.log(`Deleted stale notion post: ${file}`);

      // Delete associated image directory
      const titleSlug = file.replace('.md', '').split('-').slice(3).join('-');
      if (titleSlug) {
        const imageDir = path.join('assets/img/notion-post', titleSlug);
        if (fs.existsSync(imageDir)) {
          fs.rmSync(imageDir, { recursive: true, force: true });
          console.log(`Deleted stale image directory: ${imageDir}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
})();

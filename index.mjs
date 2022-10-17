function parseSectionBody(lines) {
  const ret = {};
  for (let line of lines) {
    let value = line.slice(line.indexOf(':') + 1).trim();
    let key = line.slice(0, line.indexOf(':')).trim();
    key = key.toLowerCase().replace(/[ /]/g, '_');
    switch (true) {
      case key === 'width':
      case key === 'height':
        value = parseInt(value.replace(' ', ''));
        break;
      case key === 'frame_rate':
        value = parseFloat(value.replace(' ', ''));
        break;
      default:
        break;
    }
    ret[key] = value;
  }

  return ret;
}

function medianinfoText2json(content) {
  const json = {};
  const sections = content.split(/(\r?\n){2}/g);
  for (let section of sections) {

    section = section.trim();
    if (section === '') {
      continue;
    }

    section = section.split(/\r?\n/g);
    const sectionName = section.shift().toLowerCase().split(' ')[0];

    // general info
    if (sectionName === 'general') {
      json[sectionName] = parseSectionBody(section)
      continue;
    }

    // chapters
    if (sectionName === 'menu') {
      json[sectionName] = section;
      continue;
    }

    // videos/audios/subtitles
    if (!json[sectionName]) {
      json[sectionName] = [];
    }

    json[sectionName].push(parseSectionBody(section));
  }

  return json;
}

export default medianinfoText2json;

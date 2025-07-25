const striptags = require('striptags');

class WantedPersonDTO {
  constructor(data) {
    this.id = data.uid;
    this.title = data.title;
    this.description = striptags(data.details || '').slice(0, 500);
    this.image = data.images?.[0]?.large || null;
    this.sex = data.sex;
    this.race = data.race;
    this.hair = data.hair;
    this.eyes = data.eyes;
    this.height = `${data.height_min || '?'} - ${data.height_max || '?'} in`;
    this.weight = `${data.weight_min || '?'} - ${data.weight_max || '?'} lbs`;
    this.reward = data.reward_max > 0 ? `$${data.reward_max}` : null;
    this.publicationDate = data.publication;
    this.link = data.url;
  }

  static fromApiArray(items = []) {
    return items.map((item) => new WantedPersonDTO(item));
  }
}

module.exports = WantedPersonDTO;

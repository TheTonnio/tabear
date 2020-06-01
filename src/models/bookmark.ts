export class Bookmark {
  id: string;
  name?: string;
  description?: string;
  url?: string;
  iconUrl?: string;

  constructor(raw: Bookmark) {
    this.id = raw.id;
    this.name = raw.name || "";
    this.description = raw.description || "";
    this.url = raw.url || "";
    this.iconUrl = raw.iconUrl;
  }
}

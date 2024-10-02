export default class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  publish() {
    console.log(`Posting new blog: ${this.title} - ${this.content}`);
  }
}

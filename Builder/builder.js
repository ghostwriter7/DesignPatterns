// BUILDER

// Simple objects can be created in a single initializer call
// Complex objects may require 10 initializer arguments !== productive
// Builder offers API for constructing an object piece by piece


// Generating a chunk of HTML example
const hello = 'hello';
const html = [];

html.push('<p>');
html.push(hello);
html.push('</p>');


// Generating a list of words
const words = ['hello', 'world'];
const html2 = [];

html2.push('<ul>\n');
for (let word of words) {
  html2.push(`  <li>${word}</li>\n`);
}
html2.push('</ul>');


// class Tag representing a single HTML tag, can have children
class Tag {
  static get indentSize() { return 2; }

  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImp(indent) {
    const html = [];
    const i = ' '.repeat(indent * Tag.indentSize);

    html.push(`${i}<${this.name}>\n`);

    if (this.text.length) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    for (let child of this.children) {
      html.push(child.toStringImp(indent + 1));
    }

    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString() {
    return this.toStringImp(0);
  }

  // to indicate to the user that he should not work directly with the Tag class but use a Builder
  static create(name) {
    return new HtmlBuilder(name);
  }
}


class HtmlBuilder {
  constructor(rootName) {
    // root is a Tag without any children, empty []
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  // creates a new Tag and pushes them to children of the root
  addChild(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  // fluid interface - return this, enables chaining methods
  addChildFluid(childName, childText) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);

    return this;
  }

  toString() {
    return this.root.toString();
  }

  // clears the content of the root, recreates it with the same root tag, but empty
  clear() {
    this.root = new Tag(this.rootName);
  }

  // indicates to the user that the process working with Builder can be completed
  build() {
    return this.root;
  }
}

// const builder = new HtmlBuilder('ul');
const builder = Tag.create('ul');

for (let word of words) {
  builder.addChild('li', word);
}

builder.clear();

// example of fluid interface, returning this enabled chaining methods
builder
  .addChildFluid('li', 'foo')
  .addChildFluid('li', 'bar')
  .addChildFluid('li', 'baz')

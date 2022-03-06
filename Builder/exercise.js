class CodeBuilder {
  static get indent() { return 2; }

  constructor(className) {
    this.className = className;
    this.fields = [];
  }

  addField(name) {
    this.fields.push(name);
    return this;
  }

  toString() {
    const codeChunks = [];

    codeChunks.push(`class ${this.className[0].toUpperCase() + this.className.slice(1).toLowerCase()} {\n`);

    if (this.fields.length) {
      codeChunks.push(' '.repeat(CodeBuilder.indent));
      codeChunks.push(`constructor(${this.fields.map((field, idx) => {
        return idx ? ` ${field}` : field;
      })}) {\n`);

      this.fields.forEach(field => {
        codeChunks.push(' '.repeat(CodeBuilder.indent + 2));
        codeChunks.push(`this.${field} = ${field};\n`);
      });

      codeChunks.push(' '.repeat(CodeBuilder.indent));
      codeChunks.push('}\n');
    }

    codeChunks.push('}');

    return codeChunks.join('');
  }
}

const codeBuilder = new CodeBuilder('Person');

codeBuilder
  .addField('name')
  .addField('age')
  .addField('occupation')
  .addField('children');

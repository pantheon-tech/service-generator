/* eslint-disable import/no-default-export */
import path from "path";
import Generator from "yeoman-generator";

/* eslint-disable @typescript-eslint/no-var-requires */
const fullnamePromise = require("fullname")();
const username = require("git-user-name")();
const email = require("git-user-email")();
/* eslint-enable @typescript-eslint/no-var-requires */

interface Answers {
  name?: string,
  description?: string,
  username?: string,
  license?: string,
}

export default class TypescriptGenerator extends Generator {
  private answers: Answers = {};

  async prompting(): Promise<void> {
    const fullname = await fullnamePromise;
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname,
      },
      {
        type: "input",
        name: "description",
        message: "Your project description",
      },
      {
        type: "input",
        name: "username",
        message: "Your git user name",
        default: username,
      },
      {
        type: "input",
        name: "email",
        message: "Your email",
        default: email,
      },
      {
        type: "input",
        name: "fullname",
        message: "Your full name",
        default: fullname,
      },
    ]);

    this.answers = answers;

    this.composeWith(require.resolve("generator-license"), {
      name: answers.fullname,
      email: answers.email,
    });
  }

  writing(): void {
    this.fs.copyTpl(
      this.templatePath("_README.md"),
      this.destinationPath("README.md"),
      {
        name: this.answers.name,
      }
    );

    this.fs.copyTpl(
      this.templatePath("_package.json"),
      this.destinationPath("package.json"),
      {
        appname: this.destinationPath().split(path.sep).pop(),
        description: this.answers.description,
        username: this.answers.username,
        license: this.answers.license,
      }
    );

    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));

    this.fs.copy(
      this.templatePath("index.ts"),
      this.destinationPath("index.ts")
    );

    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );

    this.fs.copy(
      this.templatePath(".editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath(".eslintrc.js"),
      this.destinationPath(".eslintrc.js")
    );

    this.fs.copy(
      this.templatePath(".gitignore"),
      this.destinationPath(".gitignore")
    );
  }

  installing(): void {
    this.yarnInstall();
  }
};

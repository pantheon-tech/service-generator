/* eslint-disable import/no-default-export */
/* eslint-disable unicorn/prefer-module */
import path from "path";
import Generator from "yeoman-generator";

/* eslint-disable @typescript-eslint/no-var-requires  */

interface Answers {
  description?: string;
  version?: string;
  email?: string;
  fullname?: string;
  license?: string;
  name?: string;
}

export default class TypescriptGenerator extends Generator {
  private answers: Answers = {};

  async prompting(): Promise<void> {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Service name",
        default: this.appname,
      },
      {
        type: "input",
        name: "description",
        message: "Service description",
      },  {
        type: "input",
        name: "version",
        message: "Initial version",
        default: "0.0.1"
      },

      {
        type: "input",
        name: "email",
        message: "Your email",
        default: 'daniel@pantheon.limited',
      },
      {
        type: "input",
        name: "fullname",
        message: "Your full name",
        default: 'Daniel Skipper',
      }
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
        fullname: this.answers.fullname,
        license: this.answers.license,
        version: this.answers.version,
      }
    );

    this.fs.copy(this.templatePath("src"), this.destinationPath("src"));

    this.fs.copy(
      this.templatePath("index.ts"),
      this.destinationPath("index.ts")
    );

    this.fs.copyTpl(
      this.templatePath("azure-pipeline.aml"),
      this.destinationPath("azure-pipeline.aml"),
      {
        appname: this.destinationPath().split(path.sep).pop(),
        description: this.answers.description,
      }
    );

    this.fs.copyTpl(
      this.templatePath(".env"),
      this.destinationPath("azure-pipeline.aml"),
      {
        appname: this.destinationPath().split(path.sep).pop(),
        description: this.answers.description,
      }
    );

    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );

    this.fs.copy(
      this.templatePath("tsconfig.eslint.json"),
      this.destinationPath("tsconfig.eslint.json")
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
      this.templatePath(".eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
  }
};

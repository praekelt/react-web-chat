# Praekelt Engineering Contribution Guidelines v0.0.1
The following is a set of guidelines for contributing to this project.
These are guidelines and not rules, so feel free to propose changes to this document in a pull request.
ebase
## Peer Reviews and Pull Requests
We regard pull requests as an opportunity to both learn and to teach.

If you are conducting a peer review, be nice and provide constructive criticism. For example, if you
find yourself nitpicking syntax, politely point the person submitting the PR to the relevant section of this
guideline, and ask them to resubmit the pull request once they have addressed the issue.

IF you are submitting a pull request, make sure you [follow our template](url/to/template)
and supply the reviewer with enough context and information. They're taking the time out
of their day and their work to look at your code, so make it as easy for them as possible
to provide useful feedback.

Try keep pull requests a reasonable size. Use your own judgement about what "reasonable size"
means, but put yourself in the reviewer's shoes and ask yourself whether you'd be annoyed
at being asked to review your PR.

## JIRA, Commit Messages and Branch Names
If the feature you are working on is based on a JIRA ticket, ensure that your commit messages
begin with the ticket number. For example, `FOO-445: Fixed a bug with the thing.`

Also ensure that your branch name contains the ticket number as well. For example, `feature/FOO-445_fix-the-thing`.

This is to ensure JIRA integration works smoothly and tracks your commits to GitHub.

## Coding Standards
We strive to produce code that looks like it has been written by one mind. As such, we follow
various standards which inform the style and structure of how our code is written. Everyone is
expected to adhere to these standards as far as possible.

Pull requests should be about the code, not nitpicking syntax! If somebody is nitpicking your
syntax, something is wrong.

### Convenience Utilities
If you have a `Makefile` please only use it for local development, or assisting in building the
code. Don't ever bundle it in the built artefact.

### Python
We standardise on PEP8 for a style guide, with the following alterations:
* Single/Double quotes is a personal issue. Use what you deem best.
* Line lengths is up to the discretion of the project owner, but recommended to go no higher
  than 100 characters wide
It is best to just use `flake8` configured to automate the style checks.

It is highly recommended to at least run `pylint -E` to catch obvious errors.

If you can, use `tox` to run your tests. This makes testing/porting to other Python runtimes
much easier. If you use another system to run tests, at least ensure that `tox` uses it
automatically so as to reduce duplication of effort.

### JavaScript
We have a standardised set of ESLint rules which dictate the syntax and style of our JavaScript,
which ship with each project. The only thing you need is ESLint and a compatible plugin for the
code editor of your choice.

Additionally, we use Prettier to format our code automatically. Use of Prettier is optional,
but strongly recommended for the sake of consistency.

Please ensure that the code you have written passes ESLint's tests before submitting a pull request.

### CSS and SASS
Similarly to our JavaScript, we also have a standardised set of coding rules for our stylesheets.
These rules ship with each project, and all you need is StyleLint and a compatible plugin for the
code editor of your choice.

Additionally, we use Prettier to format our code automatically. Use of Prettier is optional,
but strongly recommended for the sake of consistency.

Please ensure that the code you have written passes StyleLint's tests before submitting a pull request.

### EditorConfig
EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs.

Each project's repo contains a `.editorconfig` file, and it is widely supported across IDEs and text editors.

Please ensure that your editor has this feature enabled, or the relevant plugin installed.

## Testing
Please set up a CI with tests to run on your project. At minimum have it run all the recomended linters
we document here, so as to minimise bikeshedding in PR's.

Note that due to time constraints it isn't realistic to write unit tests for everything.
Please logically split your application into 3 levels of risk:
* LOW → Code that will only ever run under supervision, such as setup, or build tasks.
* NORMAL → Most of your code
* HIGH → Anything CORE, known to be a cause of problems, or dealing with Lives or Money.

### Unit tests / TDD
For HIGH, please try to do full on TDD and aim for 100% test coverage.
For NORMAL, please write unit tests for common cases, but 100% test coverage isn't required,
For LOW, don't write tests, but document the reasons for the exclusion.

### Integration/Behaviour tests / BDD
Please use an automation tool such as `cypress`, `behave` or equivalent as part of your CI.
This allows the CI to do a decent sanity check that the whole system works together, and not just working in isolation.

### Mocks/Fakes
It is best to test against as much real code as you can, as this will actually find more bugs.
Please use Fakes where your tests depend on an external system (e.g. SQLite instead of Postgres, or recording API calls using e.g. `vcrpy`)
Please try to not use Mocks, as it is very easy to end up writing tests that test your mocks instead of your code without anyone noticing until much later.

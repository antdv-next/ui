Developer Contribution Guide

Thank you for contributing to this project! Whether it’s code, documentation, or any other form of help, we greatly appreciate your support. Below are some guidelines to help you participate more effectively.

Styles

This project follows the Ant Design style specification. We have fully generated Ant Design styles, so you can use them directly without writing your own. Only minor adjustments may be needed based on specific requirements.

Example Showcase

For showcasing examples, we use unplugin-vue-router to implement declarative routing based on file paths. You can refer to the file structure under the src/pages directory to add new examples.

Routes are automatically generated from the file names. All you need to do is create a new Vue component file under src/pages.

For example, if the file path is src/pages/example/MyComponent.vue, the generated route will be:

https://localhost:5173/example/MyComponent

You can directly visit this path to see your component demo—no need to import it globally.

Utility Libraries
1.	Use es-toolkit instead of lodash, since es-toolkit is based on native ES6+ methods, making it smaller and more performant.
2.	For utilities similar to rc-util, you can use @v-c/util, which covers most of the functionality of rc-util.
3.	Regarding classnames: since it is a cjs library and has compatibility issues with vite@7, we no longer use it. Vue natively supports class binding, so no additional library is required. If you want a compatible helper, you can import it as follows:

import { classNames } from "relative_path/_utils/classNames"

Git Commit Conventions

We follow the Conventional Commits specification for commit messages. The format is as follows:
•	feat: new feature
•	fix: bug fix
•	docs: documentation update
•	style: code style (does not affect functionality, e.g., spaces, semicolons)
•	refactor: code refactoring (not adding a feature or fixing a bug)
•	test: add or update tests
•	chore: changes to the build process or auxiliary tools
•	ci: continuous integration changes
•	perf: performance improvements
•	build: build-related changes
•	revert: revert to a previous version
•	BREAKING CHANGE: major change (affects existing functionality)

Examples:

feat: add new login feature
fix: fix bug on registration page
docs: update README file

Acknowledgements

Many thanks to all developers and users who have contributed to this project. Your support is our driving force! If you have any questions or suggestions, feel free to reach out at any time.

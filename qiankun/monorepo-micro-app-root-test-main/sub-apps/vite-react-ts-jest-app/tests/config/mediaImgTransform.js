const path = require('path');
const camelcase = require('camelcase');
// const camelcase = import.meta.glob('camelcase');

// module.exports = {
//   process(sourceText, sourcePath, options) {
//     return {
//       code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
//     };
//   },
// };

module.exports = {
	process(src, filename, options) {
		const assetFilename = JSON.stringify(path.basename(filename));

		if (filename.match(/\.svg$/)) {
			// Based on how SVGR generates a component name:
			// https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
			const pascalCaseFilename = camelcase(path.parse(filename).name, {
				pascalCase: true,
			});
			const componentName = `Svg${pascalCaseFilename}`;
			return {
				code: `const React = require('react');
        module.exports = {
          __esModule: true,
          default: ${assetFilename},
          ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
            return {
              $$typeof: Symbol.for('react.element'),
              type: 'svg',
              ref: ref,
              key: null,
              props: Object.assign({}, props, {
                children: ${assetFilename}
              })
            };
          }),
        };`,
			};
		}

		return {
			code: `module.exports = ${assetFilename};`,
		};
	},
};

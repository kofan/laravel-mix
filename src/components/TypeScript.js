let JavaScript = require('./JavaScript');

class TypeScript extends JavaScript {
    /**
     * The API name for the component.
     */
    name() {
        return ['typeScript', 'ts'];
    }

    /**
     * Required dependencies for the component.
     */
    dependencies() {
        return ['ts-loader', 'typescript', 'tsconfig-paths-webpack-plugin'].concat(super.dependencies());
    }

    /**
     * webpack rules to be appended to the master config.
     */
    webpackRules() {
        return [].concat(super.webpackRules(), {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        });
    }

    /**
     * Override the generated webpack configuration.
     *
     * @param {Object} config
     */
    webpackConfig(config) {
        super.webpackConfig(config);
        const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

        if (!config.resolve.plugins) {
          config.resolve.plugins = [];
        }

        config.resolve.plugins.push(new TsconfigPathsPlugin());
        config.resolve.extensions.push('.ts', '.tsx');
        config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
    }
}

module.exports = TypeScript;

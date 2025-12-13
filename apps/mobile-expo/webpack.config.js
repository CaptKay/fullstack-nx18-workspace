// apps/mobile-expo/webpack.config.js
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { resolve } = require('path');

/**
 * @deprecated use bundler: 'metro' instead
 * Nx + Expo still uses this for web builds and for the project graph plugin.
 */
module.exports = async function (env = {}, argv = {}) {
  // Nx's project-graph plugin often calls this with env = {} and no mode.
  // Expo requires a valid mode: 'development' | 'production' | 'none'.
  const modeFromInputs = env.mode || argv.mode || process.env.NODE_ENV;
  const mode = ['development', 'production', 'none'].includes(modeFromInputs)
    ? modeFromInputs
    : 'development';

  // Ensure env has a valid mode before passing to expo
  const safeEnv = { ...env, mode };

  const config = await createExpoWebpackConfigAsync(safeEnv, argv);

  // --- Nx + libs integration (keep your existing customizations) ---

  // add additional rule to load files under libs
  const rules = config.module.rules.find((rule) =>
    Array.isArray(rule.oneOf)
  )?.oneOf;

  if (rules) {
    rules.push({
      test: /\.(mjs|[jt]sx?)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('@nx/webpack/src/utils/web-babel-loader.js'),
        options: {
          presets: [
            [
              '@nx/react/babel',
              {
                runtime: 'automatic',
              },
            ],
          ],
        },
      },
    });
  }

  if (!config.resolve) {
    config.resolve = {};
  }
  if (!config.resolve.plugins) {
    config.resolve.plugins = [];
  }

  const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx'];
  const tsConfigPath = resolve(__dirname, 'tsconfig.json');

  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: tsConfigPath,
      extensions,
    })
  );

  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  };

  return config;
};

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// 1. Find the project and workspace roots
const projectRoot = __dirname;
// This is the root of your monorepo
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// 2. Let Metro watch the entire workspace (app + packages)
config.watchFolders = [workspaceRoot];

// 3. Force Metro to resolve modules in the following order:
//    - App's node_modules
//    - Workspace root's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;

// markdown-handler.js - Functions for handling markdown files
const fs = require('fs')
const path = require('path')
const { ensureDirectoryExists } = require('./utils')

/**
 * Copy markdown files from a source directory to a target directory
 * @param {string} sourceDir - Source directory containing markdown files
 * @param {string} targetDir - Target directory to copy markdown files to
 */
const copyMarkdownFiles = (sourceDir, targetDir) => {
  ensureDirectoryExists(targetDir)

  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = path.resolve(sourceDir, file)
    const targetPath = path.resolve(targetDir, file)

    if (fs.statSync(sourcePath).isFile() && file.endsWith('.md')) {
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`Copied ${file} to ${targetDir}`)
    } else if (fs.statSync(sourcePath).isDirectory()) {
      // Recursively copy markdown files from subdirectories
      copyMarkdownFiles(sourcePath, path.resolve(targetDir, file))
    }
  })
}

/**
 * Update image paths in markdown files to work correctly in the browser
 * @param {string} markdownFilePath - Path to markdown file
 * @param {string} oldPath - Old image path pattern to replace (e.g., './assets/')
 * @param {string} newPath - New image path for browser (e.g., '/assets/')
 */
const updateMarkdownImagePaths = (markdownFilePath, oldPath, newPath) => {
  const content = fs.readFileSync(markdownFilePath, 'utf-8')
  
  // Create a regex that matches Markdown image syntax, handling both relative and absolute paths
  // This will match patterns like: ![Alt text](./assets/image.png) or ![Alt text](assets/image.png)
  const imageRegex = new RegExp(`!\\[(.*?)\\]\\((\\./|/)?(?:${oldPath.replace(/[-/\\^$*+?.()|[\\]{}]/g, '\\$&')})?([^)]+)\\)`, 'g')
  
  // Replace with the correct browser path
  const updatedContent = content.replace(imageRegex, (match, alt, _, imageName) => {
    // Remove any duplicate "/assets/" prefixes from the filename
    const cleanedImageName = imageName.replace(/^assets\/|^\/assets\//, '')
    
    // Use the new path with the cleaned image filename
    return `![${alt}](${newPath}${cleanedImageName})`
  })

  fs.writeFileSync(markdownFilePath, updatedContent, 'utf-8')
  console.log(`Updated image paths in ${markdownFilePath}`)
}

/**
 * Update image paths in all markdown files within a directory
 * @param {string} sourceDir - Directory containing markdown files
 * @param {string} oldPath - Old image path to replace
 * @param {string} newPath - New image path
 */
const updateAllMarkdownImagePaths = (sourceDir, oldPath, newPath) => {
  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const filePath = path.resolve(sourceDir, file)

    if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
      updateMarkdownImagePaths(filePath, oldPath, newPath)
    } else if (fs.statSync(filePath).isDirectory()) {
      updateAllMarkdownImagePaths(filePath, oldPath, newPath)
    }
  })
}

module.exports = {
  copyMarkdownFiles,
  updateMarkdownImagePaths,
  updateAllMarkdownImagePaths
}
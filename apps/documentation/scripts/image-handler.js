// image-handler.js - Functions for handling image files
const fs = require('fs')
const path = require('path')
const { ensureDirectoryExists } = require('./utils')

/**
 * Copy images from a source directory to a target directory
 * @param {string} sourceDir - Source directory containing images
 * @param {string} targetDir - Target directory to copy images to
 */
const copyImages = (sourceDir, targetDir) => {
  ensureDirectoryExists(targetDir)

  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = path.resolve(sourceDir, file)
    const targetPath = path.resolve(targetDir, file)

    if (fs.statSync(sourcePath).isFile() && (
      file.endsWith('.png') || 
      file.endsWith('.jpg') || 
      file.endsWith('.jpeg') || 
      file.endsWith('.gif') || 
      file.endsWith('.svg')
    )) {
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`Copied image ${file} to ${targetDir}`)
    } else if (fs.statSync(sourcePath).isDirectory()) {
      // Recursively copy images from subdirectories
      copyImages(sourcePath, path.resolve(targetDir, file))
    }
  })
}

module.exports = {
  copyImages
}
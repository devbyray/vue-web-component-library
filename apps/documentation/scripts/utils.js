// utils.js - Common utility functions for file operations
const fs = require('fs')
const path = require('path')

/**
 * Create directories if they don't exist
 * @param {string} dirPath - Directory path to ensure exists
 */
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Remove directory and its contents
 * @param {string} dirPath - Directory path to clean
 */
const cleanDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    // Delete files in directory
    fs.readdirSync(dirPath).forEach((file) => {
      const currentPath = path.join(dirPath, file)
      
      if (fs.statSync(currentPath).isDirectory()) {
        // Recursively delete subdirectories
        cleanDirectory(currentPath)
      } else {
        // Delete file
        fs.unlinkSync(currentPath)
        console.log(`Deleted file: ${currentPath}`)
      }
    })
    
    // Try to delete the directory itself
    // We keep the top directory but remove its contents
    // fs.rmdirSync(dirPath)
    console.log(`Cleaned directory: ${dirPath}`)
  } else {
    // Just create the directory if it doesn't exist
    ensureDirectoryExists(dirPath)
    console.log(`Created directory: ${dirPath}`)
  }
}

module.exports = {
  ensureDirectoryExists,
  cleanDirectory
}
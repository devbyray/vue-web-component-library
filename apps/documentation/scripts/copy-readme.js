// Simple script to copy markdown files to the public directory
const fs = require('fs')
const path = require('path')

// Import modules
const { cleanDirectory } = require('./utils')
const { copyMarkdownFiles, updateMarkdownImagePaths, updateAllMarkdownImagePaths } = require('./markdown-handler')
const { copyImages } = require('./image-handler')

/**
 * Copy the main README file from the root of the project
 */
const copyRootReadme = () => {
  const sourcePath = path.resolve(__dirname, '../../../README.md')
  const targetPath = path.resolve(__dirname, '../public/README.md')

  if (fs.existsSync(sourcePath)) {
    const targetDir = path.dirname(targetPath)
    cleanDirectory(targetDir)
    
    fs.copyFileSync(sourcePath, targetPath)
    console.log(`Copied root README.md to ${targetPath}`)
  } else {
    console.warn(`Root README.md not found at ${sourcePath}`)
  }
}

/**
 * Main function to copy all README and markdown files
 */
const copyReadmeFiles = () => {
  // Define directories to process
  const directories = [
    {
      source: path.resolve(__dirname, '../../../packages/components'),
      target: path.resolve(__dirname, '../public/packages/components')
    },
    {
      source: path.resolve(__dirname, '../../../docs'),
      target: path.resolve(__dirname, '../public/docs')
    }
  ]

  // Clean target directories before copying
  directories.forEach(({ target }) => {
    cleanDirectory(target)
  })

  // Copy markdown files and images from each directory
  directories.forEach(({ source, target }) => {
    if (fs.existsSync(source)) {
      copyMarkdownFiles(source, target)
      
      // Copy images from source directory to target
      const sourceImagesDir = path.resolve(source, 'assets')
      if (fs.existsSync(sourceImagesDir)) {
        const targetImagesDir = path.resolve(target, 'assets')
        copyImages(sourceImagesDir, targetImagesDir)
      }
      
      // Update image paths in markdown files to use the correct URL format for the browser
      // This makes images accessible via http://localhost:5173/assets/image.png
      updateAllMarkdownImagePaths(target, 'assets/', '/assets/') // For paths like: assets/image.png
      updateAllMarkdownImagePaths(target, './assets/', '/assets/') // For paths like: ./assets/image.png
    } else {
      console.warn(`Source directory not found: ${source}`)
    }
  })

  // Copy the root README.md
  copyRootReadme()

  // Copy images used in the root README.md
  const rootAssetsDir = path.resolve(__dirname, '../../../assets')
  const publicAssetsDir = path.resolve(__dirname, '../public/assets')
  
  // Clean assets directory before copying
  cleanDirectory(publicAssetsDir)
  
  if (fs.existsSync(rootAssetsDir)) {
    copyImages(rootAssetsDir, publicAssetsDir)
  } else {
    console.warn(`Assets directory not found: ${rootAssetsDir}`)
  }

  // Update image paths in the root README.md to use absolute paths for browser
  const rootReadmePath = path.resolve(__dirname, '../public/README.md')
  if (fs.existsSync(rootReadmePath)) {
    // Handle multiple possible path formats to ensure they all work in the browser
    updateMarkdownImagePaths(rootReadmePath, 'assets/', '/assets/')
    updateMarkdownImagePaths(rootReadmePath, './assets/', '/assets/')
    updateMarkdownImagePaths(rootReadmePath, '../assets/', '/assets/')
  }
  
  console.log('✅ Successfully copied and processed all files')
}

// Execute the script
copyReadmeFiles()
// Simple script to copy markdown files to the public directory
const fs = require('fs')
const path = require('path')

// Import modules
const { cleanDirectory, ensureDirectoryExists } = require('./utils')
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
 * Copy component README files specifically
 */
const copyComponentReadmeFiles = () => {
  const componentsDir = path.resolve(__dirname, '../../../packages/components')
  const targetBaseDir = path.resolve(__dirname, '../public/packages/components')
  
  // Make sure the target base directory exists
  ensureDirectoryExists(targetBaseDir)
  
  // Read the components directory to find all components
  if (fs.existsSync(componentsDir)) {
    const entries = fs.readdirSync(componentsDir, { withFileTypes: true })
    
    // Filter for only directories that might be components
    const componentDirs = entries.filter(entry => 
      entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'src'
    )
    
    // Process each component directory
    componentDirs.forEach(componentDir => {
      const componentSourcePath = path.join(componentsDir, componentDir.name)
      const componentTargetPath = path.join(targetBaseDir, componentDir.name)
      
      // Make sure the target directory for this component exists
      ensureDirectoryExists(componentTargetPath)
      
      // Check if this component has a README
      const readmePath = path.join(componentSourcePath, 'README.md')
      if (fs.existsSync(readmePath)) {
        // Copy the README file
        fs.copyFileSync(readmePath, path.join(componentTargetPath, 'README.md'))
        console.log(`Copied component README.md for ${componentDir.name}`)
        
        // Update image paths in the component README
        updateMarkdownImagePaths(
          path.join(componentTargetPath, 'README.md'), 
          'assets/', 
          '/assets/'
        )
      }
    })
  }
}

// Removed local implementation of ensureDirectoryExists as it is now imported from utils.js

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
  
  // Copy component README files specifically to ensure they're included
  copyComponentReadmeFiles()

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
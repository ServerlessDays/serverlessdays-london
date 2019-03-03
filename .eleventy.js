module.exports = function (eleventyConfig) {
    // Copy the `img/` directory
    eleventyConfig.addPassthroughCopy('src/img')
  
    // Copy the `css/fonts/` directory
    // If you use a subdirectory, it’ll copy using the same directory structure.
    eleventyConfig.addPassthroughCopy('src/css')
  
    return {
      passthroughFileCopy: true,
      dir: {
        input: 'src'
      },
      markdownTemplateEngine: 'njk'
    }
  }
  
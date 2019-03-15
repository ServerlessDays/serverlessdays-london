const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()

const Purgecss = require('purgecss')


module.exports = function (eleventyConfig) {
    // Copy the `img/` directory
    eleventyConfig.addPassthroughCopy('src/img')
  
    // Copy the `css/fonts/` directory
    // If you use a subdirectory, it’ll copy using the same directory structure.
    eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.addNunjucksShortcode("markdown", function(text) { return md.render(text) });
    eleventyConfig.addFilter('csspurge', function(code) {
      const purgecss = new Purgecss({
        content: ['_includes/*'],
        css: ['**/*.css']
      })
      return purgecssResult = purgecss.purge()
    })
    
    return {
      passthroughFileCopy: true,
      dir: {
        input: 'src'
      },
      markdownTemplateEngine: 'njk'
    }
  }
  
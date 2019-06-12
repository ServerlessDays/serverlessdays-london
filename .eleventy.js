const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()

const Purgecss = require('purgecss')
const { JSDOM } = require('jsdom')
const CleanCSS = require("clean-css");

const cssFiles = ['./src/css/custom.css','./src/css/markdown.css', './src/css/tachyons.css']

const cleanCSSOptions = {
  level: {
    2: {
      all: true, 
      removeDuplicateRules: true 
    }
  }
}

const insertCss = (html, css) => {

    const dom = new JSDOM(html)
    
    const { document } = dom.window

    let head = document.getElementsByTagName('head')[0];
    let style = document.createElement("style");
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);

    return dom.serialize()
}


module.exports = function (eleventyConfig) {
    // Copy the `img/` directory
    eleventyConfig.addPassthroughCopy('src/img')
    eleventyConfig.addPassthroughCopy('src/static')
  
    // Copy the `css/fonts/` directory
    // If you use a subdirectory, it’ll copy using the same directory structure.
    // eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.addNunjucksShortcode("markdown", function(text) { return md.render(text) }); 
    
    eleventyConfig.addTransform("purgeCSS", function(content, outputPath){
      if( outputPath.endsWith(".html") ) {
        console.log(outputPath)
        const purgecss = new Purgecss({
          content: [outputPath],
          css: cssFiles
        })
        const purgecssResult = purgecss.purge()
        let cssMerge = ''
        if(purgecssResult.length>0){
          for (let i = 0; i < purgecssResult.length; i++){
            cssMerge= cssMerge.concat(purgecssResult[i].css)
          }
          const cssMin = new CleanCSS(cleanCSSOptions).minify(cssMerge).styles
          return insertCss(content, cssMin)
        }
      }
      return content

    })

    return {
      passthroughFileCopy: true,
      dir: {
        input: 'src'
      },
      markdownTemplateEngine: 'njk'
    }
  }
  
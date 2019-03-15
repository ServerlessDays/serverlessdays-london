const Purgecss = require('purgecss')
const { JSDOM } = require('jsdom')

const cssFiles = ['./src/css/custom.css','./src/css/markdown.css', './src/css/tachyons.css']

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
        return insertCss(content, cssMerge)
      }
    }
    return content
  })
}
  
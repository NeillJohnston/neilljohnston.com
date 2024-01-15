const YAML = require('yaml');

module.exports = config => {
    config.addPassthroughCopy('./src/favicon-32.png');
    config.addPassthroughCopy('./src/img');

    // Why does Eleventy support YAML front matter by default, but doesn't come
    // with a YAML parser for data?
    config.addDataExtension('yaml', contents => YAML.parse(contents));

    config.addCollection('blog', collection => (
        collection
            .getFilteredByGlob('./src/blog/*.md')
            .filter(a => a.data.publish)
            .sort((a, b) => b.data.date - a.data.date)
    ));

    config.addCollection('projects', collection => (
        collection
            .getFilteredByGlob('./src/projects/*.md')
            .filter(a => a.data.publish)
            .sort((a, b) => (
                a.data.title.toLowerCase().localeCompare(b.data.title.toLowerCase())
            ))
    ));

    config.addGlobalData('buildTime', new Date().toISOString());

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};

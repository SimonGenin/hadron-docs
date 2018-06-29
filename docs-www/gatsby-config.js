'use strict';

const path = require('path');
const pluginConfigFactory = require('@brainhubeu/gatsby-docs-kit/plugins');

module.exports = {
  siteMetadata: {
    title: 'Hadron Docs',
    description: 'Hadron Framework',
    image: 'https://cdn-images-1.medium.com/max/1200/1*CLUFZFaXF6NG27NA3d_JkQ.jpeg',
    url: 'https://hadron.pro/',
    type: 'article',
    siteName: 'Hadron Documentation',
    githubUrl: 'https://github.com/brainhubeu/hadron',
  },

  plugins: [
    ...pluginConfigFactory({
      config: `${__dirname}/gatsby-docs-kit.yml`,
      resources: path.resolve(__dirname, '../docs'),
    }),
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_ID,
      }
    },
  ]
};

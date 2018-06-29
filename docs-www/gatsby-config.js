'use strict';

const path = require('path');
const pluginConfigFactory = require('@brainhubeu/gatsby-docs-kit/plugins');

module.exports = {
  siteMetadata: {
    title: 'Hadron Docs',
    description: 'Super duper Hadron website.',
    image: 'https://cdn-images-1.medium.com/max/1200/1*CLUFZFaXF6NG27NA3d_JkQ.jpeg',
    url: 'https://screencloud.dev.brainhub.pl/',
    type: 'article',
    siteName: 'Hadron Documentation',
    githubUrl: 'https://github.com/brainhubeu',
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
        anonymize: false,
        respectDNT: false,
        head: true
      }
    },
  ]
};

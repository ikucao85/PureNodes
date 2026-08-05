const https = require('https');
const GITHUB_TOKEN = process.env.GH_TOKEN;
const REPO = 'ikucao85/PureNodes';
const WORKFLOW_ID = 'auto_update.yml';

exports.handler = async () => {
  await new Promise(resolve => {
    https.request({
      hostname: 'api.github.com',
      path: `/repos/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`,
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json'
      }
    }, res => resolve()).end(JSON.stringify({ ref: 'main' }));
  });
  return { statusCode: 302, headers: { Location: './output/nodes_surfboard.conf' } };
};

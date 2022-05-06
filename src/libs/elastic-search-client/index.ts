const { Client } = require('@elastic/elasticsearch');

export default new Client({
  node: 'http://localhost:9200/',
  log: 'trace',
});

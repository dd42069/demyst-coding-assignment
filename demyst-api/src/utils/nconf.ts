import nconf from 'nconf';
import logger from './logger';

const config = nconf
  .file( './config/local.json' );

logger.info(`config: ${JSON.stringify(config.get(), null, 2)}`);

export default config;

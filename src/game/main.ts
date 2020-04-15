import 'reflect-metadata';

import { bootstrap } from '../ennj/core/bootstrap';
import { Sandbox } from './sandbox';


bootstrap(Sandbox)
    .catch(console.error);

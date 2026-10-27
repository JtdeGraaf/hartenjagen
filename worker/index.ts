import { createMergeableStore } from 'tinybase'
import { createDurableObjectSqlStoragePersister } from 'tinybase/persisters/persister-durable-object-sql-storage'
import {
  getWsServerDurableObjectFetch,
  WsServerDurableObject,
} from 'tinybase/synchronizers/synchronizer-ws-server-durable-object'

/** One shared space: everyone who connects to the same path. */
export class SharedSpace extends WsServerDurableObject {
  createPersister() {
    return createDurableObjectSqlStoragePersister(createMergeableStore(), this.ctx.storage.sql, {
      mode: 'fragmented',
    })
  }
}

type Env = { SHARED_SPACES: DurableObjectNamespace<SharedSpace> }

const openSpace = getWsServerDurableObjectFetch('SHARED_SPACES')
const SPACE_PATH = /^\/api\/sync\/[0-9a-f]{64}$/

export default {
  fetch(request, env) {
    if (!SPACE_PATH.test(new URL(request.url).pathname)) return new Response(null, { status: 404 })
    return openSpace(request, env)
  },
} satisfies ExportedHandler<Env>

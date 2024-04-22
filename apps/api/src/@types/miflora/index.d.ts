/// <reference types="node" />

import { MiFloraDevice } from '@raikm/domain-types'
declare module 'miflora' {
  export class MiFlora {
    discover(options?: any): Promise<MiFloraDevice[]>
  }
}

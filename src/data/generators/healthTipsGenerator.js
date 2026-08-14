import { healthTipLoopMs, healthTipsMock } from '../mocks/healthTips'

export function generateHealthTipsData() {
  return {
    tips: healthTipsMock,
    loopMs: healthTipLoopMs,
  }
}

import { describe, expect, test } from 'vitest'
import { convertHundredthsToReadable } from './timerService';

describe('Timer service', () => {
    test("Returns correct time in correct format", () => {
        const timeInTenths = 20450;
        const formattedTime = convertHundredthsToReadable(timeInTenths);

        expect(formattedTime).toMatchObject({
            hours : 0,
            minutes: 3,
            seconds: 24,
            hundredths: 50
        })
    })

})
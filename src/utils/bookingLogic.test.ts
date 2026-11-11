import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateServicePrice,
  formatUyuCurrency,
  validateBookingInput,
  buildWhatsAppUrl,
  STUDIO_INFO,
} from './bookingLogic';

test('calculateServicePrice returns accurate UYU price for each service and vehicle category', () => {
  assert.equal(calculateServicePrice('ceramico', 'hatch_sedan'), 14500);
  assert.equal(calculateServicePrice('ceramico', 'suv'), 16900);
  assert.equal(calculateServicePrice('pulido', 'hatch_sedan'), 8900);
  assert.equal(calculateServicePrice('interior', 'hatch_sedan'), 5800);
  assert.equal(calculateServicePrice('preventa', 'hatch_sedan'), 9500);
  assert.equal(calculateServicePrice('preventa', 'suv'), 9500);
});

test('formatUyuCurrency formats amounts clearly', () => {
  const formatted = formatUyuCurrency(9500);
  assert.ok(formatted.startsWith('$'));
  assert.ok(formatted.includes('9'));
});

test('validateBookingInput rejects empty required inputs without silent fallbacks', () => {
  const invalidResult = validateBookingInput({
    clientName: '',
    phone: '123',
    vehicleModel: '',
    vehicleCategory: 'hatch_sedan',
    serviceId: 'ceramico',
    preferredDate: '',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.clientName);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.vehicleModel);
  assert.ok(invalidResult.errors.preferredDate);

  const validResult = validateBookingInput({
    clientName: 'Martín Rodríguez',
    phone: '099 456 789',
    vehicleModel: 'Peugeot 208 GT',
    vehicleCategory: 'hatch_sedan',
    serviceId: 'ceramico',
    preferredDate: '2026-11-18',
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildWhatsAppUrl encodes Montevideo studio phone number and booking details', () => {
  const generalUrl = buildWhatsAppUrl({});
  assert.ok(generalUrl.startsWith(`https://wa.me/${STUDIO_INFO.phoneInternational}?text=`));

  const bookingUrl = buildWhatsAppUrl({
    serviceTitle: 'Tratamiento Cerámico',
    vehicleCategory: 'suv',
    vehicleModel: 'BMW X1',
    clientName: 'Lucía Gómez',
    preferredDate: '2026-11-20',
    estimatedPriceUyu: 16900,
  });

  assert.ok(bookingUrl.includes(STUDIO_INFO.phoneInternational));
  assert.ok(decodeURIComponent(bookingUrl).includes('Tratamiento Cerámico'));
  assert.ok(decodeURIComponent(bookingUrl).includes('BMW X1'));
});

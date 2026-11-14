
import { RoaringBitmapIndexer } from './roaring_bitmap.js';
import assert from 'node:assert/strict';

console.log('\n🚀 Roaring Bitmap Fleet Indexer Tests\n');

const indexer = new RoaringBitmapIndexer();

// ----------------------------------
// 1. Add Driver Attributes
// ----------------------------------

console.log('1. Adding driver attributes...');

indexer.setDriverBit('ACTIVE', 10);
indexer.setDriverBit('ACTIVE', 12);
indexer.setDriverBit('ACTIVE', 15);
indexer.setDriverBit('ACTIVE', 20);

indexer.setDriverBit('HAZMAT', 12);
indexer.setDriverBit('HAZMAT', 15);
indexer.setDriverBit('HAZMAT', 20);

indexer.setDriverBit('REFRIGERATED', 15);
indexer.setDriverBit('REFRIGERATED', 20);

indexer.setDriverBit('EXPERIENCED', 20);

// ----------------------------------
// 2. Test Active and Hazmat Drivers
// ----------------------------------

console.log('2. Testing Active + Hazmat...');

const activeHazmat = indexer.intersectAttributes([
    'ACTIVE',
    'HAZMAT'
]);

assert.deepStrictEqual(activeHazmat, [12, 15, 20]);

// ----------------------------------
// 3. Test Multiple Attributes
// ----------------------------------

console.log('3. Testing multiple attributes...');

const allQualified = indexer.intersectAttributes([
    'ACTIVE',
    'HAZMAT',
    'REFRIGERATED'
]);

assert.deepStrictEqual(allQualified, [15, 20]);

// ----------------------------------
// 4. Test Active Drivers Only
// ----------------------------------

console.log('4. Testing Active drivers...');

const activeDrivers = indexer.intersectAttributes([
    'ACTIVE'
]);

assert.deepStrictEqual(activeDrivers, [10, 12, 15, 20]);

// ----------------------------------
// 5. Test Experienced Drivers
// ----------------------------------

console.log('5. Testing Experienced drivers...');

const experiencedDrivers = indexer.intersectAttributes([
    'EXPERIENCED'
]);

assert.deepStrictEqual(experiencedDrivers, [20]);

// ----------------------------------
// 6. Test Non-existent Attribute
// ----------------------------------

console.log('6. Testing non-existent attributes...');

const noMatch = indexer.intersectAttributes([
    'ACTIVE',
    'HAZMAT',
    'NON_EXISTENT'
]);

assert.deepStrictEqual(noMatch, []);

// ----------------------------------
// 7. Test Empty Attribute List
// ----------------------------------

console.log('7. Testing empty attribute list...');

const emptyResult = indexer.intersectAttributes([]);

assert.deepStrictEqual(emptyResult, []);

// ----------------------------------
// 8. Test Duplicate Attribute
// ----------------------------------

console.log('8. Testing duplicate attributes...');

const duplicateResult = indexer.intersectAttributes([
    'ACTIVE',
    'ACTIVE'
]);

assert.deepStrictEqual(duplicateResult, [10, 12, 15, 20]);

// ----------------------------------
// 9. Test Single Driver Intersection
// ----------------------------------

console.log('9. Testing single matching driver...');

const singleDriver = indexer.intersectAttributes([
    'ACTIVE',
    'EXPERIENCED'
]);

assert.deepStrictEqual(singleDriver, [20]);

// ----------------------------------
// 10. Final Result
// ----------------------------------

console.log('\n================================');
console.log('✅ All 10 test groups passed!');
console.log('🚛 Fleet Indexer working correctly.');
console.log('================================\n');

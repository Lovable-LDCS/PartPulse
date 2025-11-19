#!/usr/bin/env node

/**
 * Image Assets Verification Script
 * 
 * This script checks if the branding images from Issue #5 have been
 * properly uploaded to the /public/assets/ folder.
 * 
 * Usage: node scripts/verify-images.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Image requirements
const requiredImages = [
  {
    name: 'App Logo',
    filename: 'logo.png',
    path: path.join(__dirname, '../public/assets/logo.png'),
    minSize: 5000, // At least 5KB (placeholder is ~264 bytes)
    description: 'Trane Thermo King logo for the header',
    purpose: 'Displays in top-left corner of the app header',
  },
  {
    name: 'Pulse GIF',
    filename: 'pulse.gif',
    path: path.join(__dirname, '../public/assets/pulse.gif'),
    minSize: 1000, // At least 1KB
    description: 'Animated pulse indicator',
    purpose: 'Animates next to "PartPulse" text in header',
    optional: true,
  },
];

console.log(`${colors.bright}${colors.cyan}╔═══════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}║     PARTPULSE IMAGE ASSETS VERIFICATION TOOL          ║${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}╚═══════════════════════════════════════════════════════╝${colors.reset}`);
console.log('');

let allPassed = true;
let optionalMissing = false;

requiredImages.forEach((image, index) => {
  console.log(`${colors.bright}${index + 1}. ${image.name}${colors.reset} (${image.filename})`);
  console.log(`   Purpose: ${image.purpose}`);
  
  // Check if file exists
  if (!fs.existsSync(image.path)) {
    if (image.optional) {
      console.log(`   ${colors.yellow}⚠ OPTIONAL: File not found - fallback will be used${colors.reset}`);
      optionalMissing = true;
    } else {
      console.log(`   ${colors.red}✗ FAIL: File not found${colors.reset}`);
      allPassed = false;
    }
    console.log('');
    return;
  }
  
  // Check file size
  const stats = fs.statSync(image.path);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  
  if (stats.size < image.minSize) {
    console.log(`   ${colors.yellow}⚠ WARNING: File seems too small (${fileSizeKB} KB)${colors.reset}`);
    console.log(`   ${colors.yellow}   This might still be a placeholder file${colors.reset}`);
    if (!image.optional) {
      allPassed = false;
    }
  } else {
    console.log(`   ${colors.green}✓ PASS: File exists (${fileSizeKB} KB)${colors.reset}`);
  }
  
  // Check file extension
  const ext = path.extname(image.filename).toLowerCase();
  const actualExt = path.extname(image.path).toLowerCase();
  
  if (ext !== actualExt) {
    console.log(`   ${colors.red}✗ FAIL: Wrong file extension (expected ${ext}, got ${actualExt})${colors.reset}`);
    if (!image.optional) {
      allPassed = false;
    }
  }
  
  console.log('');
});

// Final summary
console.log(`${colors.bright}═══════════════════════════════════════════════════════${colors.reset}`);
console.log('');

if (allPassed && !optionalMissing) {
  console.log(`${colors.bright}${colors.green}✓ ALL CHECKS PASSED!${colors.reset}`);
  console.log('');
  console.log('All required branding images are in place.');
  console.log('Your app should display the Trane branding correctly.');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Visit: http://localhost:3000');
  console.log('  3. Verify the logo and pulse animation appear in the header');
  console.log('');
  process.exit(0);
} else if (allPassed && optionalMissing) {
  console.log(`${colors.bright}${colors.green}✓ REQUIRED CHECKS PASSED${colors.reset}`);
  console.log(`${colors.yellow}⚠ Optional assets missing (fallbacks will be used)${colors.reset}`);
  console.log('');
  console.log('Required images are in place.');
  console.log('Optional images are missing but the app will use fallbacks.');
  console.log('');
  process.exit(0);
} else {
  console.log(`${colors.bright}${colors.red}✗ VERIFICATION FAILED${colors.reset}`);
  console.log('');
  console.log('Some required images are missing or invalid.');
  console.log('');
  console.log('To fix this:');
  console.log('  1. Read: IMAGE_UPLOAD_INSTRUCTIONS.md');
  console.log('  2. Download images from Issue #5');
  console.log('  3. Upload them to: public/assets/');
  console.log('  4. Run this script again to verify');
  console.log('');
  console.log(`${colors.cyan}Quick help:${colors.reset}`);
  console.log('  Issue #5: https://github.com/Lovable-LDCS/PartPulse-1/issues/5');
  console.log('  Upload guide: See IMAGE_UPLOAD_INSTRUCTIONS.md');
  console.log('');
  process.exit(1);
}

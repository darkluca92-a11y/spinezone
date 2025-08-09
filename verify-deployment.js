#!/usr/bin/env node

/**
 * SpineZone Website Deployment Verification Script
 * 
 * This script verifies that the website is properly configured for Netlify deployment.
 * Run with: node verify-deployment.js
 */

const fs = require('fs');
const path = require('path');

console.log('🏥 SpineZone Website Deployment Verification\n');

let allChecks = true;

function checkFile(filePath, description) {
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✅' : '❌'} ${description}: ${filePath}`);
    if (!exists) allChecks = false;
    return exists;
}

function checkDirectory(dirPath, description) {
    const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    console.log(`${exists ? '✅' : '❌'} ${description}: ${dirPath}`);
    if (!exists) allChecks = false;
    return exists;
}

function checkContent(filePath, searchText, description) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const found = content.includes(searchText);
        console.log(`${found ? '✅' : '❌'} ${description}`);
        if (!found) allChecks = false;
        return found;
    } catch (error) {
        console.log(`❌ ${description} (file read error)`);
        allChecks = false;
        return false;
    }
}

console.log('📁 Checking Required Files:');
checkFile('next.config.mjs', 'Next.js configuration');
checkFile('netlify.toml', 'Netlify configuration');
checkFile('package.json', 'Package configuration');
checkFile('tailwind.config.ts', 'Tailwind CSS configuration');
checkFile('tsconfig.json', 'TypeScript configuration');

console.log('\n📂 Checking Required Directories:');
checkDirectory('src', 'Source code directory');
checkDirectory('src/app', 'Next.js app directory');
checkDirectory('src/components', 'Components directory');
checkDirectory('src/lib', 'Library directory');
checkDirectory('out', 'Build output directory');

console.log('\n📄 Checking Build Output:');
checkFile('out/index.html', 'Homepage HTML');
checkFile('out/contact/index.html', 'Contact page HTML');
checkFile('out/about/index.html', 'About page HTML');
checkFile('out/services/index.html', 'Services page HTML');
checkFile('out/locations/index.html', 'Locations page HTML');
checkFile('out/patient-portal/index.html', 'Patient portal HTML');
checkDirectory('out/_next/static', 'Static assets directory');

console.log('\n⚙️  Checking Configuration:');
checkContent('next.config.mjs', 'output: \'export\'', 'Static export enabled in next.config.mjs');
checkContent('next.config.mjs', 'distDir: \'out\'', 'Output directory configured');
checkContent('netlify.toml', 'publish = "out"', 'Netlify publish directory set');
checkContent('netlify.toml', 'command = "npm run build"', 'Netlify build command set');

console.log('\n🛡️  Checking Security:');
checkContent('netlify.toml', 'X-Frame-Options', 'Security headers configured');
checkContent('netlify.toml', 'X-XSS-Protection', 'XSS protection header');
checkContent('netlify.toml', 'Strict-Transport-Security', 'HSTS header configured');

console.log('\n🔄 Checking Demo Features:');
checkContent('src/app/contact/page.tsx', 'DEMO MODE', 'Contact form has demo mode');
checkContent('src/components/InteractiveMap.tsx', 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY', 'Maps has API key check');
checkContent('src/lib/supabase.ts', 'isSupabaseConfigured', 'Supabase has configuration check');

console.log('\n📊 Build Information:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`✅ Project Name: ${packageJson.name}`);
    console.log(`✅ Version: ${packageJson.version}`);
    console.log(`✅ Node Version: ${packageJson.engines?.node || 'Not specified'}`);
    
    // Check build artifacts
    const outStats = fs.readdirSync('out');
    const htmlFiles = outStats.filter(f => f.endsWith('.html')).length;
    const directories = outStats.filter(f => fs.statSync(path.join('out', f)).isDirectory()).length;
    
    console.log(`✅ Generated HTML files: ${htmlFiles + directories}`);
    console.log(`✅ Static directories: ${directories}`);
    
    // Check CSS and JS files
    const staticDir = 'out/_next/static';
    if (fs.existsSync(staticDir)) {
        const cssFiles = fs.readdirSync(path.join(staticDir, 'css')).filter(f => f.endsWith('.css'));
        const jsChunks = fs.readdirSync(path.join(staticDir, 'chunks')).filter(f => f.endsWith('.js'));
        console.log(`✅ CSS files: ${cssFiles.length}`);
        console.log(`✅ JS chunks: ${jsChunks.length}`);
    }
} catch (error) {
    console.log('❌ Error reading build information');
    allChecks = false;
}

console.log('\n🎯 Deployment Readiness Summary:');
console.log('==========================================');

if (allChecks) {
    console.log('🎉 SUCCESS: All checks passed!');
    console.log('   The website is ready for Netlify deployment.');
    console.log('   📋 Next Steps:');
    console.log('   1. Push code to GitHub repository');
    console.log('   2. Connect repository to Netlify');
    console.log('   3. Configure build settings:');
    console.log('      - Build command: npm run build');
    console.log('      - Publish directory: out');
    console.log('   4. Deploy and verify!');
    process.exit(0);
} else {
    console.log('⚠️  WARNING: Some checks failed!');
    console.log('   Please review the failed items above before deploying.');
    console.log('   Run "npm run build" if the build output is missing.');
    process.exit(1);
}
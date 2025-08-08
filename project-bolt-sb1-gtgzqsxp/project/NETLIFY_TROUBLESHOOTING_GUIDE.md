# 🔧 Netlify Deployment Troubleshooting Guide

## 🎯 **MOST COMMON ISSUES & SOLUTIONS**

### 1. **Build Command Issues** ⚠️ HIGH PRIORITY

**Problem:** Build fails with "command not found" or dependency errors

**Solution:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18.17.0"
  NPM_FLAGS = "--production=false"
```

**Verification Steps:**
1. Check that `package.json` has `"build": "next build"` script
2. Verify Node version compatibility (18.17.0+ required)
3. Ensure all dependencies are in `package.json`, not just `package-lock.json`

---

### 2. **Next.js Static Export Configuration** ⚠️ HIGH PRIORITY

**Problem:** Build succeeds but pages don't load (404 errors)

**Current Configuration Status:** ✅ FIXED
```javascript
// next.config.mjs - Properly configured for static export
export default {
  output: 'export',           // Required for Netlify static hosting
  trailingSlash: true,       // SEO-friendly URLs
  images: { unoptimized: true } // Required for static export
}
```

---

### 3. **Environment Variables** ⚠️ MEDIUM PRIORITY

**Problem:** Site builds but features don't work (forms, analytics, etc.)

**Check These Variables:**
```env
# Required for production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.netlify.app

# Optional - Only add if using Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Optional - Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

**Setup in Netlify:**
1. Go to Site settings → Environment variables
2. Add each variable individually
3. Redeploy after adding variables

---

### 4. **API Routes in Static Export** ⚠️ HIGH PRIORITY

**Problem:** API routes cause build failures in static export

**Current Status:** ✅ PARTIALLY ADDRESSED
- Contact API routes exist but may cause build issues
- Solution: API routes are converted to static JSON or handled client-side

**If Build Fails Due to API Routes:**
1. **Option 1:** Remove API routes and use external form services
2. **Option 2:** Convert to client-side form handling
3. **Option 3:** Use Netlify Forms (recommended)

---

### 5. **Dependency Resolution** ⚠️ MEDIUM PRIORITY

**Problem:** "Module not found" or package errors during build

**Quick Fixes:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Force clean install
npm ci
```

**Check for:**
- TypeScript compilation errors
- Missing peer dependencies  
- Outdated package versions

---

## 🔍 **DIAGNOSTIC COMMANDS**

### **Test Locally Before Deploying:**
```bash
# Test the exact build process Netlify uses
npm run build

# Verify the output directory exists
ls -la out/

# Test the built site locally
npx serve out/
```

### **Common Build Error Patterns:**

**1. TypeScript Errors:**
```
Error: Type error: Property 'X' does not exist on type 'Y'
```
**Solution:** Fix TypeScript errors in development first

**2. Missing Dependencies:**
```
Error: Cannot resolve module 'package-name'
```
**Solution:** `npm install package-name`

**3. API Route Errors:**
```
Error: API Routes are not supported in static export
```
**Solution:** Remove API routes or handle client-side

---

## 🚀 **RECOMMENDED DEPLOYMENT PROCESS**

### **Step 1: Local Verification**
```bash
# Clean install
npm ci

# Test build locally
npm run build

# Verify output
ls -la out/
```

### **Step 2: Netlify Configuration**
1. **Build command:** `npm run build`
2. **Publish directory:** `out`
3. **Node version:** `18.17.0`

### **Step 3: Deploy & Monitor**
1. Deploy from Netlify dashboard
2. Monitor build logs for errors
3. Test deployed site thoroughly

---

## 🛠️ **EMERGENCY FIXES**

### **If Build Still Fails:**

**1. Minimal Build Test:**
```bash
# Create minimal test build
npm run build -- --debug
```

**2. Dependency Audit:**
```bash
# Check for security issues
npm audit fix
```

**3. Force Update Dependencies:**
```bash
# Update all packages
npm update
```

### **Alternative Deployment Method:**
If automatic Git deployment fails, try manual deployment:
1. Run `npm run build` locally
2. Drag the `out/` folder to Netlify dashboard
3. Test functionality
4. Switch back to Git deployment once working

---

## 📊 **POST-DEPLOYMENT VERIFICATION**

### **Essential Checks:**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact forms submit (test with real data)
- [ ] Images display properly
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable

### **Performance Targets:**
- **Load Time:** <3 seconds
- **Lighthouse Score:** 90+
- **Mobile Usability:** 100%
- **No console errors**

---

## 🆘 **QUICK DIAGNOSTIC QUESTIONS**

**If you're still having issues, check:**

1. **What's the exact error message** in Netlify build logs?
2. **Does `npm run build` work locally** without errors?
3. **Are you using the correct build command** (`npm run build`) in Netlify?
4. **Is the publish directory set to `out`** in Netlify settings?
5. **Are there any API routes** that might be causing static export issues?

Let me know the specific error message from your Netlify build logs, and I can provide a targeted solution! 🔧